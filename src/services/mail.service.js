import nodemailer from "nodemailer"
import env from "../config/env.config.js"

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS
  }
})

export const sendResetPasswordEmail = async (email, token) => {

  const resetLink = `http://localhost:3000/reset-password?token=${token}`

  await transporter.sendMail({
    from: `"Ecommerce API" <${env.MAIL_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `
      <h2>Password Reset</h2>
      <p>Click the button to reset your password</p>
      <a href="${resetLink}">
        <button>Reset Password</button>
      </a>
    `
  })
}