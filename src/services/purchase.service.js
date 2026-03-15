import { CartRepository } from "../repositories/cart.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { TicketRepository } from "../repositories/ticket.repository.js";
import { v4 as uuidv4 } from "uuid";

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const ticketRepository = new TicketRepository();

export class PurchaseService {

  async purchaseCart(cartId, userEmail) {

    const cart = await cartRepository.getCartById(cartId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const productsToPurchase = [];
    const productsNotPurchased = [];

    let totalAmount = 0;

    for (const item of cart.products) {

      const product = await productRepository.getProductById(item.product._id);

      if (product.stock >= item.quantity) {

        product.stock -= item.quantity;

        await product.save();

        totalAmount += product.price * item.quantity;

        productsToPurchase.push(item);

      } else {

        productsNotPurchased.push(item.product._id);

      }

    }

    let ticket = null;

    if (productsToPurchase.length > 0) {

      ticket = await ticketRepository.createTicket({
        code: uuidv4(),
        amount: totalAmount,
        purchaser: userEmail
      });

    }

    cart.products = cart.products.filter(
      p => productsNotPurchased.includes(p.product._id)
    );

    await cart.save();

    return {
      ticket,
      productsNotPurchased
    };

  }

}