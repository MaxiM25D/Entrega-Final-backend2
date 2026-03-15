import { CartDAO } from "../dao/cart.dao.js";

const cartDAO = new CartDAO();

export class CartRepository {

  createCart() {
    return cartDAO.create();
  }

  getCartById(id) {
    return cartDAO.getById(id);
  }

  saveCart(cart) {
    return cartDAO.save(cart);
  }

}