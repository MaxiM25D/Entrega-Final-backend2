import express from "express";
import passport from "passport";
import cron from "node-cron";
import environment, { validateEnv } from "../config/env.config.js";
import { connectAuto } from "../config/db/connect.config.js";
import { initPassport } from "../config/auth/passport.config.js";
import { initRouters } from "../routes/routes.js";
import { cleanExpiredTokens } from "../jobs/cleanTokens.js";



const app = express();
const PORT = environment.PORT;

app.use(express.json());


export const startServer = async () => {

  // Validar variables de entorno
  validateEnv();

  // Conectar DB
  await connectAuto();

  // limpiar tokens al iniciar
  await cleanExpiredTokens();

  // 🧹 CRON JOB
  cron.schedule("*/10 * * * *", () => {
    console.log("🧹 Limpiando tokens...");
    cleanExpiredTokens();
  });

  // Inicializar Passport (JWT)
  app.use(passport.initialize());
  initPassport();

  // Inicializar rutas
  initRouters(app);

  // Levantar servidor
  app.listen(PORT, () =>
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
  );
};