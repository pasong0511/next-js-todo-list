import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db";
import Todo from "@/models/todo";
import { v4 } from "uuid";

connect();

function getIdFromPathname(s: string): string {
  const pathList = s.split("/");

  return pathList[pathList.length - 1];
}

export async function GET(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const id = getIdFromPathname(path);

    const todo = await Todo.findOne({ id });

    console.log(todo);

    return NextResponse.json({ msg: "find all todos", success: true, todo });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "이슈 발생!",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const id = getIdFromPathname(path);

    await Todo.deleteOne({ id });
    return NextResponse.json({ msg: "find one Delete", success: true });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "이슈 발생!",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    const id = getIdFromPathname(path);

    const reqBody = await request.json();
    console.log(reqBody);

    const { desc, completed } = reqBody;

    console.log(desc, completed);
    await Todo.updateOne({ id }, { $set: { desc, completed } });
    return NextResponse.json({ msg: "Todo Edited", success: true });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "수정 이슈 발생!",
      },
      { status: 500 }
    );
  }
}
