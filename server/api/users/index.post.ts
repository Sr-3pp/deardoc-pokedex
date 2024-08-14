import type { UserType } from "~/types";
import User from "~/server/Models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user: UserType = body;
  try {
    const newUser: UserType = await User.create(user);
    return newUser;
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      message: error.message,
    });
  }
});
