import mongoose from "mongoose";

const TodoShema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.models.todos || mongoose.model("todos", TodoShema);

export default Todo;
