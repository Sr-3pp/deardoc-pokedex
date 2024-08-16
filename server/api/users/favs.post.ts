import { Pokemon, UserInterface } from "~/interfaces";
import User from "~/server/Models/User";

export default defineEventHandler(async (event) => {
  const _user = await readBody(event);

  const user: UserInterface | null = await User.findOne({ id: _user.id });
  if (!user) {
    throw createError({
      status: 404,
      message: "User not found",
    });
  }
  user.favorites = _user.favorites;
  await user.save();
  return user;
});
