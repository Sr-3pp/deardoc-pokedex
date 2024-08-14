<script setup lang="ts">
import type { Pokemon, PokemonUrl } from "~/interfaces";
import type { UserType } from "~/types";

const { user } = useAuth();
const favorites = computed<string[]>(() => user.value?.favorites || []);
const { getPokemon } = usePokedex();

const updateFavorites = (favorites: string[]) => {
  user.value!.favorites = favorites;
};
</script>

<template>
  <div>
    <h1>Favorites of {{ user?.name }}</h1>
    <ul>
      <li v-for="fav in favorites" :key="fav">
        <PokemonCard :pokemonName="fav" @updateFavorites="updateFavorites" />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
