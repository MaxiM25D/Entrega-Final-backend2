import { Cart } from "../models/cart.model.js";

export class CartDAO {

  create() {
    return Cart.create({ products: [] });
  }

  getById(id) {
    return Cart.findById(id).populate("products.product");
  }

  save(cart) {
    return cart.save();
  }

}