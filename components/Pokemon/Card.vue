<script setup lang="ts">
import type { Pokemon, PokemonUrl } from "~/interfaces";

const props = defineProps<{
  pokemonName: string;
}>();

const { isLoggedIn } = useAuth();
const { getPokemon } = usePokedex();

const pokemon = await getPokemon(props.pokemonName);

const { user } = useAuth();

const emit = defineEmits<{
  (event: "updateFavorites", favorites: string[]): void;
}>();

const updateFavorites = async () => {
  await $fetch("/api/users/favs", {
    method: "POST",
    body: {
      user: user.value,
    },
  });
};

const addPokemonToFavorites = async () => {
  user.value!.favorites.push(props.pokemonName);
  updateFavorites();
  emit("updateFavorites", user.value!.favorites);
};

const removePokemonFromFavorites = async () => {
  user.value!.favorites = user.value!.favorites.filter(
    (fav) => fav !== props.pokemonName
  );
  updateFavorites();
  emit("updateFavorites", user.value!.favorites);
};
</script>

<template>
  <article>
    <img :src="pokemon.sprites.other.showdown.front_default" alt="pokemon" />
    <h2>{{ pokemon.name }}</h2>
    <button
      v-if="isLoggedIn && !user?.favorites.includes(pokemon.name)"
      @click="addPokemonToFavorites"
    >
      Add to favorites
    </button>
    <button v-else-if="isLoggedIn" @click="removePokemonFromFavorites">
      Remove from favorites
    </button>
  </article>
</template>

<style scoped></style>
