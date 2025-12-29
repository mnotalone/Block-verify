const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  setAuthCookies,
  clearAuthCookies
} = require("../utils/tokenService");

const sanitizeUser = (userDoc) => {
  const user = userDoc.toObject({ getters: true, virtuals: false });
  delete user.passwordHash;
  delete user.refreshTokens;
  return user;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return false;
  }
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasLetter && hasNumber;
};

const issueTokens = async (user, req, res) => {
  const payload = { sub: user.id, role: user.role };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  const decodedRefresh = jwt.decode(refreshToken);
  const expiresAt = decodedRefresh?.exp ? new Date(decodedRefresh.exp * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await user.addRefreshToken(refreshToken, expiresAt, {
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip
  });

  setAuthCookies(res, accessToken, refreshToken);
  return { accessToken };
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    if (!email || !validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Valid email is required" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters and include letters and numbers"
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      passwordHash,
      role: role && ["admin", "user"].includes(role) ? role : undefined
    });

    const tokens = await issueTokens(user, req, res);

    return res.status(201).json({
      success: true,
      data: {
        user: sanitizeUser(user),
        tokens
      }
    });
  } catch (error) {
    console.error("Register error", error);
    return res.status(500).json({ success: false, message: "Unable to register user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (user.isFirstLogin) {
      user.isFirstLogin = false;
      await user.save({ validateBeforeSave: false });
    }

    const tokens = await issueTokens(user, req, res);

    return res.status(200).json({
      success: true,
      data: {
        user: sanitizeUser(user),
        tokens
      }
    });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ success: false, message: "Unable to login" });
  }
};

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: "Refresh token missing" });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err) {
      console.error("Refresh token verify failed", err);
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const matchingToken = await findMatchingRefreshToken(user, refreshToken);
    if (!matchingToken) {
      return res.status(401).json({ success: false, message: "Refresh token revoked" });
    }

    await user.removeRefreshTokenByHash(matchingToken.tokenHash);

    const tokens = await issueTokens(user, req, res);

    return res.status(200).json({
      success: true,
      data: {
        user: sanitizeUser(user),
        tokens
      }
    });
  } catch (error) {
    console.error("Token refresh error", error);
    return res.status(500).json({ success: false, message: "Unable to refresh session" });
  }
};

const findMatchingRefreshToken = async (user, token) => {
  for (const stored of user.refreshTokens) {
    const isMatch = await bcrypt.compare(token, stored.tokenHash);
    if (isMatch && stored.expiresAt > new Date()) {
      return stored;
    }
  }
  return null;
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (refreshToken) {
      try {
        const decoded = verifyRefreshToken(refreshToken);
        const user = await User.findById(decoded.sub);
        if (user) {
          const matchingToken = await findMatchingRefreshToken(user, refreshToken);
          if (matchingToken) {
            await user.removeRefreshTokenByHash(matchingToken.tokenHash);
          }
        }
      } catch (err) {
        console.warn("Failed to verify refresh token on logout", err.message);
      }
    }

    clearAuthCookies(res);
    return res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    console.error("Logout error", error);
    return res.status(500).json({ success: false, message: "Unable to logout" });
  }
};

const getProfile = async (req, res) => {
  return res.status(200).json({ success: true, data: { user: sanitizeUser(req.user) } });
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  getProfile
};
