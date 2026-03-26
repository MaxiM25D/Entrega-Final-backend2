import { CartRepository } from "../repositories/cart.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { TicketRepository } from "../repositories/ticket.repository.js";
import { PurchaseDTO } from "../dto/purchase.dto.js";
import { sendPurchaseEmail } from "./mail.service.js";

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const ticketRepository = new TicketRepository();

export class PurchaseService {

  async purchaseCart(cartId, userEmail) {

    const cart = await cartRepository.getCartById(cartId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const productsPurchased = [];
    const productsNotPurchased = [];

    let totalAmount = 0;

    for (const item of cart.products) {

      const productId = item.product._id
        ? item.product._id
        : item.product;

      const product = await productRepository.getProductById(productId);

      if (product.stock >= item.quantity) {

        product.stock -= item.quantity;

        await productRepository.updateProduct(product._id, {
          stock: product.stock
        });

        productsPurchased.push(item);

        totalAmount += product.price * item.quantity;

      } else {

        productsNotPurchased.push(item);

      }

    }

    if (productsPurchased.length === 0) {

      return new PurchaseDTO(null, productsNotPurchased);

    }

    const ticket = await ticketRepository.createTicket({
      amount: totalAmount,
      purchaser: userEmail
    });

    await cartRepository.updateCart(cartId, {
      products: productsNotPurchased
    });

    await sendPurchaseEmail(userEmail, ticket, productsPurchased);

    return new PurchaseDTO(ticket, productsNotPurchased);

  }

}