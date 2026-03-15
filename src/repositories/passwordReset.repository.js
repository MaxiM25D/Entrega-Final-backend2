import { PasswordResetDAO } from "../dao/passwordReset.dao.js";

const dao = new PasswordResetDAO();

export class PasswordResetRepository {

  createToken(data) {
    return dao.create(data);
  }

  getToken(token) {
    return dao.findByToken(token);
  }

  deleteToken(token) {
    return dao.delete(token);
  }

}