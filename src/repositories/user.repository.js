export class UserRepository {

  constructor(dao) {
    this.dao = dao;
  }

  getAllUsers() {
    return this.dao.getAll();
  }

  getUserById(id) {
    return this.dao.getById(id);
  }

  getUserByEmail(email) {
    return this.dao.getByEmail(email);
  }

  createUser(userData) {
    return this.dao.create(userData);
  }

  deleteUser(id) {
    return this.dao.delete(id);
  }

}