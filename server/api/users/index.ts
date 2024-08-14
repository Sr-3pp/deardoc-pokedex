import User from "~/server/Models/User";

export default defineEventHandler(async (event) => {
  return await User.find();
});
