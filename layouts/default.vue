<script setup lang="ts">
const loading = ref(true);
provide("loading", loading);

const { hook } = useNuxtApp();
const { isDarkMode, toggleDarkMode } = useDarkMode();

hook("page:start", () => {
  loading.value = true;
});

hook("page:finish", () => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>

<template>
  <main :class="{ dark: isDarkMode }">
    <Transition name="fade">
      <Loader v-if="loading" />
    </Transition>
    <Navbar :toggleDarkMode="toggleDarkMode" :isDarkMode="isDarkMode" />
    <NuxtPage />
  </main>
</template>

<style scoped></style>
