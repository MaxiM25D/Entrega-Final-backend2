import { PasswordReset } from "../models/passwordReset.model.js";

export class PasswordResetDAO {

  create(data) {
    return PasswordReset.create(data);
  }

  findByToken(token) {
    return PasswordReset.findOne({ token });
  }

  delete(token) {
    return PasswordReset.deleteOne({ token });
  }

}