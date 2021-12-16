import mongoose, { Collection } from "mongoose";

require("dotenv").config();
const connection = {};
console.log(process.env.MONGO_UR, "process.env.MONGO_UR\n\n\n\n\n\n\n\n\n");
export async function dbConnect(url = process.env.MONGO_URI) {
  if (connection.isConnected) return;

  const db = await mongoose.connect("mongodb://localhost/economistapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log("connected db: ", db);
}

export async function dbDisconnect() {
  await mongoose.disconnect();
}
