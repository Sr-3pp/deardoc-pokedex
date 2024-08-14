import type { UserType } from "~/types";

export default function useAuth() {
  const user = useState<UserType | null>("user", () => null);
  const isLoggedIn = useState<boolean>("isLoggedIn", () => false);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const _user = await $fetch("/api/users/login", {
        method: "POST",
        body: { email, password },
      });

      user.value = _user;
      isLoggedIn.value = true;

      navigateTo("/");
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  const register = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const _user = await $fetch("/api/users", {
        method: "POST",
        body: { email, password },
      });

      (user as any).value = _user;
      isLoggedIn.value = true;

      navigateTo("/");
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  };

  const logout = async () => {
    user.value = null;
    isLoggedIn.value = false;
    navigateTo("/login");
  };

  return { login, register, logout, user, isLoggedIn };
}
