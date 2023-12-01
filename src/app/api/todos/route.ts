import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db";
import Todo from "@/models/todo";
import { v4 } from "uuid";

connect();

export async function GET(request: NextRequest) {
  try {
    const todos = await Todo.find({});
    console.log(todos);
    return NextResponse.json({ msg: "find all todos", success: true, todos });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "이슈 발생!",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { desc } = reqBody;
    console.log(desc);

    const newTodo = new Todo({
      id: v4(),
      desc,
      completed: false,
    });

    const savedTodo = await newTodo.save();
    return NextResponse.json({ msg: "todo added", success: true, savedTodo });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "이슈 발생!",
      },
      { status: 500 }
    );
  }
}
