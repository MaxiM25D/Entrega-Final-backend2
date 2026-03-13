import { User } from "../models/user.model.js";
import { isValidPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

export class SessionManager {

  async loginUser(email, password) {

    const user = await User.findOne({ email });

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