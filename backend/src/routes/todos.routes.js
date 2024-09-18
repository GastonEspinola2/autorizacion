import { Router } from "express";
import { createTodo, deleteTodo, editTodo, getAllTodosCtrl } from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/",validarJwt, getAllTodosCtrl);

todosRouter.delete("/:id", deleteTodo);

todosRouter.post("/",validarJwt,createTodo)

todosRouter.put("/:id",validarJwt,editTodo);

export { todosRouter };
