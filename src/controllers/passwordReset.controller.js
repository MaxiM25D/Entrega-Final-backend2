import { PasswordResetService } from "../services/passwordReset.service.js";

const service = new PasswordResetService();

export const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const token = await service.requestReset(email);

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    res.json({
      message: "Password reset link generated",
      resetLink
    });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};


export const resetPassword = async (req, res) => {

  try {

    const { token, password } = req.body;

    await service.resetPassword(token, password);

    res.json({
      message: "Password updated successfully"
    });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};