<script setup lang="ts">
import type { UserInterface } from "~/interfaces";

const { data: users } = await useFetch<UserInterface[]>("/api/users");

const deleteUser = async (id: string) => {
  await $fetch(`/api/users/`, {
    method: "DELETE",
    body: {
      _id: id,
    },
  });
  users.value = (users.value as UserInterface[]).filter(
    (user) => user._id !== id
  );
};

definePageMeta({
  title: "Users",
  middleware: "admin",
});
</script>

<template>
  <div class="container">
    <ul class="user-list">
      <li class="user-list-item" v-for="user in users" :key="user._id">
        {{ user.email }}
        <PokemonButton @click="deleteUser(user._id as string)">
          Delete User
        </PokemonButton>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
  .user-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: pxToRem(10);
    border: {
      style: solid;
      width: pxToRem(2);
      color: $colorPokemonRed;
    }
    border-radius: pxToRem(5);
    margin-bottom: pxToRem(10);
  }
}
</style>
