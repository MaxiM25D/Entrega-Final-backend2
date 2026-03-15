import { UserRepository } from "../repositories/user.repository.js";

const userRepository = new UserRepository();

export class UserService {

  getUsers() {
    return userRepository.getUsers();
  }

  getUserById(id) {
    return userRepository.getUserById(id);
  }

  getUserByEmail(email) {
    return userRepository.getUserByEmail(email);
  }

  createUser(data) {
    return userRepository.createUser(data);
  }

  deleteUser(id) {
    return userRepository.deleteUser(id);
  }

}