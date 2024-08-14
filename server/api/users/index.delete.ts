import { UserType } from "~/types";
import User from "~/server/Models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { _id } = body;
  try {
    await User.deleteOne({ _id });
    return { message: "User deleted" };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode,
      message: error.message,
    });
  }
});
