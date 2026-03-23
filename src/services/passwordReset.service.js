import crypto from "crypto";
import { PasswordResetRepository } from "../repositories/passwordReset.repository.js";

const repository = new PasswordResetRepository();

export class PasswordResetService {

  async generateToken(email) {

    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(Date.now() + 3600000);

    await repository.createToken({
      email,
      token,
      expiresAt
    });

    return token;
  }

  async validateToken(token) {

    console.log("TOKEN RECIBIDO:", token);

    const record = await repository.getToken(token);

    console.log("RECORD EN DB:", record);

    if (!record) {
      throw new Error("Invalid token");
    }

    if (record.used) {
      throw new Error("Token already used");
    }

    if (record.expiresAt < new Date()) {
      throw new Error("Token expired");
    }

    return record;
  }

  async markTokenUsed(token) {
    await repository.markTokenUsed(token);
  }

}