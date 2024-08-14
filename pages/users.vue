<script setup lang="ts">
import type { UserType } from "~/types";

const { data: users } = await useFetch<UserType[]>("/api/users");

const deleteUser = async (id: string) => {
  await $fetch(`/api/users/`, {
    method: "DELETE",
    body: {
      _id: id,
    },
  });
  users.value = (users.value as UserType[]).filter((user) => user._id !== id);
};
</script>

<template>
  <div>
    Page: users
    <ul>
      <li v-for="user in users" :key="user._id">
        {{ user.email }}
        <button @click="deleteUser(user._id as string)">delete User</button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
