import { PasswordReset } from "../models/passwordReset.model.js";

export class PasswordResetDAO {

  create(data) {
    return PasswordReset.create(data);
  }

  findByToken(token) {
    return PasswordReset.findOne({ token });
  }

  markAsUsed(token) {
    return PasswordReset.updateOne(
      { token },
      { used: true }
    );
  }

}