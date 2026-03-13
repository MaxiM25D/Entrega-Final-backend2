import { UserRepository } from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { Cart } from "../models/cart.model.js";

const userRepository = new UserRepository();

export class UserService {

  async getUsers() {
    return userRepository.getUsers();
  }

  async getUserById(id) {
    return userRepository.getUserById(id);
  }

  async register(userData) {

    const { first_name, last_name, email, password, age } = userData;

    const existingUser = await userRepository.getUserByEmail(email);

    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    const hashedPassword = createHash(password);

    const newCart = await Cart.create({ products: [] });

    const newUser = await userRepository.createUser({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age,
      cart: newCart._id
    });

    return newUser;

  }

  async login(email, password) {

    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const validPassword = isValidPassword(user, password);

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user);

    return { user, token };

  }

}