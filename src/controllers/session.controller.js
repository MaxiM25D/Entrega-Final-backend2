import { SessionService } from "../services/session.service.js";

import { UserDTO } from "../dto/user.dto.js";
import { UserService } from "../services/user.service.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js"
import { Cart } from "../models/cart.model.js";
import { PasswordResetService } from "../services/passwordReset.service.js";


const sessionService = new SessionService();
const userService = new UserService();
const passwordResetService = new PasswordResetService();

export const registerUser = async (req, res) => {

  try {

    const { first_name, last_name, email, password, age } = req.body;

    if (!first_name || !last_name || !email || !password || !age) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = createHash(password);

    const newCart = await Cart.create({ products: [] });

    const newUser = await userService.createUser({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age,
      cart: newCart._id
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: new UserDTO(newUser)
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await sessionService.loginUser(email, password);

    res.json({
      message: "Login exitoso",
      user: new UserDTO(result.user),
      token: result.token
    });

  } catch (error) {

    res.status(401).json({ error: error.message });

  }

};

export const currentUser = (req, res) => {

  res.json({
    user: new UserDTO(req.user)
  });

};

export const forgotPassword = async (req, res) => {

  const { email } = req.body;

  const user = await userService.getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = await passwordResetService.generateToken(email);

  /* await sendResetPasswordEmail(email, token); */
  console.log("TOKEN:", token);
  res.json({ message: "Reset email sent" });

};

export const resetPassword = async (req, res) => {

  const { token, newPassword } = req.body;

  try {

    const record = await passwordResetService.validateToken(token);

    const user = await userService.getUserByEmail(record.email);

    const samePassword = await isValidPassword(user, newPassword);

    if (samePassword) {
      return res.status(400).json({
        message: "Password cannot be the same"
      });
    }

    const hashedPassword = createHash(newPassword);

    await userService.updateUser(user._id, {
      password: hashedPassword
    });

    await passwordResetService.markTokenUsed(token);

    res.json({ message: "Password updated successfully" });

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

};