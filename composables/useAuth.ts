import type { UserInterface } from "~/interfaces";

export default function useAuth() {
  const storedUser: any = useLocalStorage<UserInterface | null>(
    "user",
    () => null
  );
  const storedIsLoggedIn = useLocalStorage<boolean>("isLoggedIn", () => false);

  const user = computed({
    get: () => JSON.parse(storedUser.value),
    set: (newValue) => {
      storedUser.value = JSON.stringify(newValue);
    },
  });

  const isLoggedIn = computed({
    get: () => storedIsLoggedIn.value,
    set: (newValue: boolean) => {
      storedIsLoggedIn.value = newValue;
    },
  });

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

  const logout = async () => {
    user.value = null;
    isLoggedIn.value = false;
    navigateTo("/login");
  };

  const updateFavorites = (pokemon: string, key: string) => {
    if (!pokemon) return;
    let favorites = user.value.favorites;
    if (key === "remove") {
      favorites = favorites.filter((_pokemon: string) => _pokemon !== pokemon);
    } else {
      favorites.push(pokemon);
    }

    user.value = { ...user.value, favorites };

    $fetch(`/api/users/favs`, {
      method: "POST",
      body: user.value,
    });
  };

  return {
    login,
    register,
    logout,
    updateFavorites,
    user,
    isLoggedIn,
  };
}
