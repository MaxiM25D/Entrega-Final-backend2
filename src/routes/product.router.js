import { Router } from "express";
import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from "../controllers/product.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", auth, authorize("admin"), createProduct);
router.put("/:id", auth, authorize("admin"), updateProduct);
router.delete("/:id", auth, authorize("admin"), deleteProduct);

export default router;