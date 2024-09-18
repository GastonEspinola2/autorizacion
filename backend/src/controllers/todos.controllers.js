import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  console.log(req.user.id);
  const todos = database.todos.filter((todo)=>todo.owner === req.user.id)

  res.json({ todos });
};

export const deleteTodo = (req,res)=>{
  const id = parseInt(req.params.id);
  
  const encontrarTodo = database.todos.findIndex((todo)=>todo.id === id);
  database.todos.splice(encontrarTodo, 1);
  res.json({
    Msg:"Tarea eliminada correctamente"
  })
}

export const createTodo = (req, res) => {
  const { title, completed } = req.body;
  const newTodo = {
    id: database.todos.length + 1,
    title,
    completed: completed || false,
    owner: req.user.id
  };
  
  database.todos.push(newTodo);
  res.status(201).json(newTodo);
};

export const editTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  const indexTask = database.todos.findIndex(task => task.id === id && task.owner === req.user.id);

  if (indexTask === -1) {
    return res.status(404).json({ msg: 'Tarea no encontrada' });
  }

  if (title) database.todos[indexTask].title = title;
  if (completed !== undefined) database.todos[indexTask].completed = completed;

  return res.status(200).json({ msg: 'Tarea actualizada' });
};
