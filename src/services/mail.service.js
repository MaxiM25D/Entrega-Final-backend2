import nodemailer from "nodemailer";
import env from "../config/env.config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS
  }
});

export const sendPurchaseEmail = async (to, ticket, products) => {

  const productList = products.map(p => `
    <li>
      ${p.product.name} x ${p.quantity} - $${p.product.price}
    </li>
  `).join("");

  await transporter.sendMail({
    from: `"Ecommerce" <${env.MAIL_USER}>`,
    to,
    subject: "🧾 Confirmación de compra",
    html: `
    <div style="font-family: Arial; padding:20px">
      <h1>Gracias por tu compra 🎉</h1>
      
      <p><b>Código:</b> ${ticket.code}</p>
      <p><b>Total:</b> $${ticket.amount}</p>

      <h3>Productos:</h3>
      <ul>
        ${productList}
      </ul>

      <p>Fecha: ${new Date(ticket.purchase_datetime).toLocaleString()}</p>
    </div>
    `
  });

};