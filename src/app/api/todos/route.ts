import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db";
import Todo from "@/models/todo";
import { v4 } from "uuid";

connect();

export async function GET(request: NextRequest) {
  try {
    const todos = await Todo.find({});
    console.log();
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
