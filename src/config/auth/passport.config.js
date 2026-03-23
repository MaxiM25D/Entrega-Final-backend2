import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserDAO } from "../../dao/user.dao.js";
import { isValidPassword } from "../../utils/bcrypt.js";
import env from "../env.config.js";


const userDao = new UserDAO();
export const initPassport = () => {

   // 🔐 LOCAL STRATEGY (LOGIN)
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email", // importante
        passwordField: "password"
      },
      async (email, password, done) => {
        try {

          const user = await userDao.getByEmail(email);

          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }

          const validPassword = isValidPassword(user, password);

          if (!validPassword) {
            return done(null, false, { message: "Contraseña incorrecta" });
          }

          return done(null, user);

        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // 🔐 JWT STRATEGY (PROTEGER RUTAS)
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: env.JWT_SECRET
      },
      async (payload, done) => {
        try {

          const user = await userDao.getById(payload.sub);

          if (!user) return done(null, false);

          return done(null, {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
          });

        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};