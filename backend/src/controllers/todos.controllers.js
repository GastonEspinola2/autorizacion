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

// export const crearTodo = (req,res)=>{
//   const {id, title, completed} = req.body;

//   const newTodo = db.push({id: id, title: title, completed:completed})
//   res.json({
//     msg:"Todo agregado correctamente"
//   })
// }