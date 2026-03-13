import { CartManager } from "../managers/cart.manager.js";

const cartManager = new CartManager();

export const createCart = async (req, res) => {
  try {
    const newCart = await cartManager.create();
    res.status(201).json({ message: "Carrito creado con exito!", newCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await cartManager.getById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    res.json({message: "Carrito por ID obtenido con exito!", cart});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const user = req.user;
    const productId = req.params.pid;
    const updatedCart = await cartManager.addProduct(
      user.cart,
      productId
    );

    res.json({message: "Producto agregado al carrito con exito!", updatedCart});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};