export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn.value) {
    return navigateTo("/login");
  }
  if (user.value.email !== "admin@mail.com") {
    return navigateTo("/");
  }
});
