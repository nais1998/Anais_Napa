import { Router } from "express";
import * as ejem from '../controllers/ejemplo.controller.js'

const ejemploRoutes = Router();

ejemploRoutes.get('/', ejem.getAllejemploController);
ejemploRoutes.get('/:id', ejem.getIdejemplosControlers);
ejemploRoutes.post('/', ejem.postEjemploController);
ejemploRoutes.put('/:id', ejem.putEjemploController);
ejemploRoutes.delete('/:id', ejem.deleteEjemploController);

export default ejemploRoutes;