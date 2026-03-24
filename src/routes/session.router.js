import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import env from "../config/env.config.js";
import {registerUser, currentUser, forgotPassword, resetPassword, logoutUser} from "../controllers/session.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";



const router = Router();

router.post("/register", registerUser);

// LOGIN con LocalStrategy
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      {
        sub: req.user._id,
        role: req.user.role
      },
      env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login exitoso " + req.user.first_name + " " + req.user.last_name,
      user: {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role
      },
      token
    });
  }
);

router.post("/logout", auth, authorize("user"), logoutUser);
// CURRENT con JwtStrategy
router.get("/current", passport.authenticate("jwt", { session: false }), auth, authorize("user"), currentUser);
router.post("/forgot-password", auth, authorize("user"), forgotPassword );
router.post("/reset-password", auth, authorize("user"), resetPassword);

export default router;