"use client";
import React, { useState } from "react";

export default function Todos() {
  const [inputText, setInputText] = useState();
  const [todos, setTodos] = useState([1, 2, 3]);
  const [editMode, setEditMode] = useState(false);

  const onChange = (e: any) => {
    setInputText(e.target.value);
  };

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
          />
        </div>
        <div className="flex gap-4">
          <div className="text-lg">edit completed:</div>
          <input type="checkbox" />
        </div>
        <button className="text-m shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1">
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
        <div className="text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1">
          Add
        </div>
        <div className="text-xl shadow-md bg-gray-600 text-white hover:bg-gray-500 rounded-md px-3 py-1">
          Clear
        </div>
      </div>
      <div className="w-5/6 flex flex-col gap-2">
        {todos.map((todo, index) => {
          return (
            <div className="bg-violet-600 flex justify-between items-center items-center p-2 rounded-lg shadow-md">
              <div className="flex gap-2">
                <input type="checkbox" />
                <div className="text-lg text-white">코드입력</div>
              </div>
              <div className="flex gap-2">
                <button className="text-m shadow-md bg-green-600 text-white hover:bg-green-500 rounded-md px-1">
                  Edit
                </button>
                <button className="text-m shadow-md bg-red-600 text-white hover:bg-red-500 rounded-md px-1">
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
