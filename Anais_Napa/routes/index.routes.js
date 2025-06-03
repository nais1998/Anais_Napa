import { Router } from "express";
import ejemploRoutes from "./ejemplo.routes.js";
import viaje from "./Viaje.routes.js";


const indexRouter = Router();

indexRouter.use('/ejemplo', ejemploRoutes);
indexRouter.use('/viajes', viaje)

export default indexRouter;