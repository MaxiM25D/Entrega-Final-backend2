import { Router } from "express";
import {createCart, getCartById, addProductToCart} from "../controllers/cart.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { purchaseCart } from "../controllers/purchase.controller.js";

const router = Router();

router.post("/", auth, createCart);
router.get("/:cid", auth, getCartById);
router.post("/products/:pid", auth, authorize("user", "admin"), addProductToCart);
router.post("/purchases/:cid", auth, purchaseCart);


export default router;