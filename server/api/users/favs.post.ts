import { Pokemon } from "~/interfaces";
import User from "~/server/Models/User";
import { UserType } from "~/types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { user: _user }: { user: UserType; pokemon: string } = body;
  const user: UserType | null = await User.findOne({ id: _user.id });
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
