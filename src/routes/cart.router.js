import { Router } from "express";
import {createCart, getCartById, addProductToCart} from "../controllers/cart.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", auth, createCart);
router.get("/:cid", auth, getCartById);
router.post("/products/:pid", auth, addProductToCart);

export default router;