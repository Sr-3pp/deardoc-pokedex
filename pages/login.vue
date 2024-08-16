<script setup lang="ts">
const user = ref({
  email: "",
  password: "",
});

const { login, register } = useAuth();

const isNewUser = ref(false);
</script>

<template>
  <div class="container">
    <form class="form" @submit.prevent="login(user)" v-if="!isNewUser">
      <input type="email" placeholder="email" v-model="user.email" />
      <input type="password" placeholder="password" v-model="user.password" />
      <PokemonButton type="submit">Login</PokemonButton>
    </form>
    <form class="form" @submit.prevent="register(user)" v-else>
      <input type="email" placeholder="email" v-model="user.email" />
      <input type="password" placeholder="password" v-model="user.password" />
      <PokemonButton type="submit">Register</PokemonButton>
    </form>
    <br />
    <PokemonButton @click="isNewUser = !isNewUser">
      {{ isNewUser ? "Login" : "Register" }}
    </PokemonButton>
  </div>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: pxToRem(10);
  input {
    min-width: pxToRem(300);
    padding: pxToRem(10);
    border: {
      style: solid;
      width: pxToRem(2);
      color: $colorPokemonRed;
    }
    border-radius: pxToRem(5);
  }

  > *:not(:last-child) {
    margin-bottom: pxToRem(10);
  }
}
</style>
