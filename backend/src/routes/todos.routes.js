import { Router } from "express";
import { deleteTodo, getAllTodosCtrl } from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/",validarJwt, getAllTodosCtrl);

todosRouter.delete("/:id", deleteTodo);

todosRouter.patch("/:id");

export { todosRouter };
