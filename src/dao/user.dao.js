import { User } from "../models/user.model.js";

export class UserDAO {

  async getAll() {
    return User.find();
  }

  async getById(id) {
    return User.findById(id).lean();
  }

  async getByEmail(email) {
    return User.findOne({ email });
  }

  async create(userData) {
    return User.create(userData);
  }

  async delete(id) {
    return User.findByIdAndDelete(id);
  }

}