import { Router } from "express";
import { MovieController } from "../controllers/movie.controller.js";
export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.get('/:id', MovieController.getById)

moviesRouter.post('/', MovieController.create)
