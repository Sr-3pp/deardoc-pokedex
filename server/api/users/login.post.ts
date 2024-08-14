import User from "~/server/Models/User";
import jwt from "jsonwebtoken";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const user: any = await User.findOne({ email }).select("+password");
  if (!user || !user.password) {
    throw createError({
      statusCode: 401,
      message: "User not found",
    });
  }

  const validate_pass = await user.verifyPasswordSync(password);

  if (!validate_pass) {
    throw createError({
      statusCode: 401,
      message: "Invalid password",
    });
  }

  const { secret } = config.jwt as { secret: string };
  const token = jwt.sign({ user_id: user._id }, secret, {
    expiresIn: "2h",
  });

  user.token = token;
  return user;
});
