import type { UserInterface } from "~/interfaces";
import User from "~/server/Models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user: UserInterface = body;
  try {
    const newUser: UserInterface = await User.create(user);
    return newUser;
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      message: error.message,
    });
  }
});
