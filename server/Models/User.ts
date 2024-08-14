import mongoose, { Schema } from "mongoose";
import bcrypt from "mongoose-bcrypt";
import { UserType } from "~/types";

const schema: Schema<UserType> = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, bcrypt: true, select: false },
    favorites: [{ type: String }],
  },
  { timestamps: true, strict: true, strictQuery: true }
);
schema.plugin(bcrypt);
export default mongoose.models.User || mongoose.model("User", schema, "user");
