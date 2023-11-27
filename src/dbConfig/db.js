import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connect.on("connected", () => {
      console.log("connect to db");
    });
  } catch (error) {
    console.log("failed to connect fo db", error);
  }
}
