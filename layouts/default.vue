<script setup lang="ts">
const { isLoggedIn, user, logout } = useAuth();
</script>

<template>
  <main>
    <template v-if="isLoggedIn">
      <p>user: {{ user?.email }}</p>
      <NuxtLink to="/">All</NuxtLink>
      <NuxtLink to="/favs">My Favs</NuxtLink>
      <button @click="logout">Logout</button>
    </template>
    <template v-else>
      <NuxtLink to="/">All</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
    </template>
    <SearchBar />
    <NuxtPage />
  </main>
</template>

<style scoped></style>
