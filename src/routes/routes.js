//ROUTES
import sessionRouter from "./session.router.js";
import productRouter from "./product.router.js";
import userRouter from "./user.router.js";
import cartRouter from "./cart.router.js";

export function initRouters(app) {

  app.use("/api/sessions", sessionRouter);
  app.use("/api/products", productRouter);
  app.use("/api/users", userRouter);
  app.use("/api/carts", cartRouter);
  // 404
  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
}