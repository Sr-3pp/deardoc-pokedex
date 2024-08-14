<script setup lang="ts">
const user = ref({
  email: "",
  password: "",
});

const { login, register } = useAuth();

const isNewUser = ref(false);
</script>

<template>
  <div>
    <form @submit.prevent="login(user)" v-if="!isNewUser">
      <input type="email" v-model="user.email" />
      <input type="password" v-model="user.password" />
      <button type="submit">Login</button>
    </form>
    <form @submit.prevent="register(user)" v-else>
      <input type="email" v-model="user.email" />
      <input type="password" v-model="user.password" />
      <button type="submit">Register</button>
    </form>
    <button @click="isNewUser = !isNewUser">
      {{ isNewUser ? "Login" : "Register" }}
    </button>
  </div>
</template>

<style scoped></style>
