import { CartRepository } from "../repositories/cart.repository.js";

const cartRepository = new CartRepository();

export class CartService {

  async createCart() {
    return cartRepository.createCart();
  }

  async getCartById(id) {
    return cartRepository.getCartById(id);
  }

  async addProduct(cartId, productId) {

    const cart = await cartRepository.getCartById(cartId);

    if (!cart) return null;

    const existingProduct = cart.products.find(
      p => p.product._id.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cartRepository.saveCart(cart);

    return cart;
  }
}