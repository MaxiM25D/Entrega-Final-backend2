import { CartRepository } from "../repositories/cart.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();

export class CartService {

  async createCart() {
    return cartRepository.createCart();
  }

  async getCartById(id) {
    return cartRepository.getCartById(id);
  }

  async updateCart(id, data) {
    return cartRepository.updateCart(id, data);
  }
  
  async addProduct(cartId, productId) {

    const cart = await cartRepository.getCartById(cartId);

  if (!cart) {
    throw new Error("Carrito no encontrado");
  }

  const product = await productRepository.getProductById(productId);

  if (!product) {
    throw new Error("Producto no encontrado");
  }


    const existingProduct = cart.products.find(p => {
      const prodId = p.product._id
        ? p.product._id.toString()
        : p.product.toString();
      return prodId === productId;
    });

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cartRepository.saveCart(cart);

    return cart;
  }
}