const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_TTL = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const REFRESH_TOKEN_TTL = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

const createAccessToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
};

const createRefreshToken = (payload) => {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not configured");
  }
  return jwt.sign(payload, secret, { expiresIn: REFRESH_TOKEN_TTL });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};

const toMaxAge = (exp) => {
  if (!exp) {
    return 0;
  }
  const msUntilExpiry = exp * 1000 - Date.now();
  return msUntilExpiry > 0 ? msUntilExpiry : 0;
};

const setAuthCookies = (res, accessToken, refreshToken) => {
  const secure = process.env.NODE_ENV === "production";
  const accessDecoded = jwt.decode(accessToken);
  const refreshDecoded = jwt.decode(refreshToken);

  const baseOptions = {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    path: "/"
  };

  res.cookie("accessToken", accessToken, {
    ...baseOptions,
    maxAge: toMaxAge(accessDecoded?.exp)
  });

  res.cookie("refreshToken", refreshToken, {
    ...baseOptions,
    maxAge: toMaxAge(refreshDecoded?.exp)
  });
};

const clearAuthCookies = (res) => {
  const secure = process.env.NODE_ENV === "production";
  const options = {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    expires: new Date(0),
    path: "/"
  };
  res.cookie("accessToken", "", options);
  res.cookie("refreshToken", "", options);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  setAuthCookies,
  clearAuthCookies
};
