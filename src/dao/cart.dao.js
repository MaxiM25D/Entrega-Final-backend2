import { Cart } from "../models/cart.model.js";

export class CartDAO {

  create() {
    return Cart.create({ products: [] });
  }

  getById(id) {
    return Cart.findById(id).populate("products.product");
  }

  update(id, data) {
  return Cart.findByIdAndUpdate(id, data, { new: true });
}
  save(cart) {
    return cart.save();
  }

}