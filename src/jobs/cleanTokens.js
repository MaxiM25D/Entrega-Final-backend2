import { PasswordReset } from "../models/passwordReset.model.js";

export const cleanExpiredTokens = async () => {
  const result = await PasswordReset.deleteMany({
    expiresAt: { $lt: new Date() }
  });

  console.log("🧹 Tokens eliminados:", result.deletedCount);
};