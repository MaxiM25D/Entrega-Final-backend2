import { Cart } from "../models/cart.model.js";

export class CartManager {

  async create() {
    return await Cart.create({ products: [] });
  }

  async getById(id) {
    return await Cart.findById(id).populate("products.product");
  }

  async addProduct(cartId, productId) {

    const cart = await Cart.findById(cartId);

    if (!cart) return null;

    const existingProduct = cart.products.find(
      p => p.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    return cart;
  }
}