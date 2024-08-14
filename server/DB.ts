import mongoose from "mongoose";
const { mongo } = useRuntimeConfig();
export default async () => {
  try {
    await mongoose.connect(mongo.url);
    console.log("DB connection established.");
  } catch (err) {
    console.log("DB connection failed.", err);
  }
};
