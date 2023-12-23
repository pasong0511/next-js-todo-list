"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface TodoProps {
  id: string;
  desc: string;
  completed: boolean;
}

export default function Todos() {
  const [inputText, setInputText] = useState<string>("");
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editTodoInfo, setEditTodoInfo] = useState<TodoProps>({
    id: "",
    desc: "",
    completed: false,
  });

  const onChange = (e: any) => {
    setInputText(e.target.value);
  };

  const addTodo = async () => {
    const data = {
      desc: inputText,
    };
    const res = await axios.post("/api/todos", data);
    setTodos((prevTodos) => [...prevTodos, res.data.savedTodo]);
    setInputText("");
    //clearTodos();
  };

  const clearAllTodos = async () => {
    try {
      const response = await axios.delete("/api/todos");
      console.log(response.data);
      setTodos([]);

      // 성공시 처리 로직
      // 예: 상태 업데이트, 사용자에게 피드백 제공 등
    } catch (error: any) {
      // 에러 처리 로직
      console.error(
        "Error deleting todos:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteTodo = async (e: any, id: string) => {
    const response = await axios.delete(`/api/todos/${id}`);

    if (response.data.success) {
      const removeList = todos.filter((todo) => todo.id !== id);
      setTodos(removeList);
    }

    console.log(response);
    console.log(id);
  };

  const editTodo = async (e: any, todo: TodoProps) => {
    setEditMode(true);
    setEditTodoInfo(todo);
  };

  const updateTodo = async () => {
    const data = {
      desc: editTodoInfo.desc,
      completed: editTodoInfo.completed,
    };

    const response = await axios.put(`/api/todos/${editTodoInfo.id}`, data);
    console.log(response);
    setEditMode(false);
    if (response.data.success) {
      const modifyTodos = todos.map((todo) => {
        if (todo.id === editTodoInfo.id) {
          return {
            ...todo,
            completed: editTodoInfo.completed,
            desc: editTodoInfo.desc,
          };
        } else {
          return todo;
        }
      });
      setTodos(modifyTodos);
    }
  };

  const fetchTodo = async () => {
    axios.get("/api/todos").then((res) => {
      setTodos(res.data.todos);
    });
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  if (editMode) {
    return (
      <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
        <div className="text-2xl">edit mode</div>
        <div className="flex gap-4">
          <div className="text-lg">edit desc:</div>
          <input
            className="rounded-md shadow-md text-lg"
            type="text"
            placeholder="enter new desc"
            value={editTodoInfo.desc}
            onChange={(e) =>
              setEditTodoInfo({
                ...editTodoInfo,
                desc: e.target.value,
              })
            }
          />
        </div>
        <div className="flex gap-4">
          <div className="text-lg">edit completed:</div>
          <input
            type="checkbox"
            checked={editTodoInfo.completed}
            onChange={(e) =>
              setEditTodoInfo({
                ...editTodoInfo,
                completed: !editTodoInfo.completed,
              })
            }
          />
        </div>
        <button
          onClick={updateTodo}
          className="text-m shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1"
        >
          submit
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32">
      <div className="text-2xl">Todo List Next</div>
      <div className="flex gap-2">
        <input
          className="text-xl rounded-md"
          type="text"
          placeholder="enter todo"
          value={inputText}
          onChange={onChange}
        />
        <div
          onClick={addTodo}
          className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1"
        >
          Add
        </div>
        <div
          onClick={clearAllTodos}
          className="text-xl shadow-md bg-gray-600 text-white hover:bg-gray-500 rounded-md px-3 py-1"
        >
          Clear
        </div>
      </div>
      <div className="w-5/6 flex flex-col gap-2">
        {todos.map((todo, index) => {
          return (
            <div
              key={todo.id}
              className="bg-violet-600 flex justify-between items-center items-center p-2 rounded-lg shadow-md"
            >
              <div className="flex gap-2">
                <input type="checkbox" defaultChecked={todo.completed} />
                <div className="text-lg text-white">{todo.desc}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => editTodo(e, todo)}
                  className="text-m shadow-md bg-green-600 text-white hover:bg-green-500 rounded-md px-1"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => deleteTodo(e, todo.id)}
                  className="text-m shadow-md bg-red-600 text-white hover:bg-red-500 rounded-md px-1"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
