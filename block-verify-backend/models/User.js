const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const refreshTokenSchema = new mongoose.Schema(
  {
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    userAgent: { type: String },
    ipAddress: { type: String }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isFirstLogin: { type: Boolean, default: true },
    refreshTokens: { type: [refreshTokenSchema], default: [] }
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function comparePassword(plainText) {
  return bcrypt.compare(plainText, this.passwordHash);
};

userSchema.methods.addRefreshToken = async function addRefreshToken(token, expiresAt, meta = {}) {
  const tokenHash = await bcrypt.hash(token, 10);
  this.refreshTokens.push({ tokenHash, expiresAt, ...meta });
  const maxTokens = 5;
  if (this.refreshTokens.length > maxTokens) {
    this.refreshTokens = this.refreshTokens.slice(-maxTokens);
  }
  await this.save({ validateBeforeSave: false });
};

userSchema.methods.removeRefreshTokenByHash = async function removeRefreshTokenByHash(tokenHash) {
  this.refreshTokens = this.refreshTokens.filter((stored) => stored.tokenHash !== tokenHash);
  await this.save({ validateBeforeSave: false });
};

userSchema.methods.clearRefreshTokens = async function clearRefreshTokens() {
  this.refreshTokens = [];
  await this.save({ validateBeforeSave: false });
};

module.exports = mongoose.model("User", userSchema);
