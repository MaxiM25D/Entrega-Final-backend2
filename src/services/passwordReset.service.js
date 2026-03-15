import crypto from "crypto";
import { PasswordResetRepository } from "../repositories/passwordReset.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

const passwordResetRepo = new PasswordResetRepository();
const userRepo = new UserRepository();

export class PasswordResetService {

  async requestReset(email) {

    const user = await userRepo.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expires = new Date(Date.now() + 60 * 60 * 1000);

    await passwordResetRepo.createToken({
      email,
      token,
      expiresAt: expires
    });

    return token;
  }

  async resetPassword(token, newPassword) {

    const record = await passwordResetRepo.getToken(token);

    if (!record) {
      throw new Error("Invalid token");
    }

    if (record.expiresAt < new Date()) {
      throw new Error("Token expired");
    }

    const user = await userRepo.getUserByEmail(record.email);

    const samePassword = await isValidPassword(user, newPassword);

    if (samePassword) {
      throw new Error("Password cannot be the same");
    }

    user.password = createHash(newPassword);

    await user.save();

    await passwordResetRepo.deleteToken(token);

    return true;
  }

}