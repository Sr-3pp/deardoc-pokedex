<script setup lang="ts">
import type { Pokemon } from "~/interfaces";

const route = useRoute();
const { data, error } = await useFetch<Pokemon>(
  `/api/pokemon/${route.params.pokemon}`
);
if (error.value) {
  throw createError({
    statusCode: 404,
    message: "Pokemon not found",
  });
}
</script>

<template>
  <div>
    <h1>{{ data?.name }}</h1>
    <figure>
      <img
        :src="data?.sprites.other['official-artwork'].front_default"
        :alt="data?.name"
      />
    </figure>
  </div>
</template>

<style lang="scss" scoped></style>
