import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import env from "../config/env.config.js";
import {registerUser, currentUser} from "../controllers/session.controller.js";



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
// CURRENT con JwtStrategy
router.get("/current", passport.authenticate("jwt", { session: false }), currentUser);

export default router;