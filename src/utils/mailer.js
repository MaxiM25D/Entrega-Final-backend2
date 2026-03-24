import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendResetPasswordEmail = async (email, token) => {

  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Soporte" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Recuperar contraseña",
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Hacé click en el siguiente link:</p>
      <a href="${resetLink}">Restablecer contraseña</a>
      <p>Este link expira en 1 hora</p>
    `
  });
};