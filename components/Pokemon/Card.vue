<script setup lang="ts">
import type { Pokemon, PokemonUrl } from "~/interfaces";
import * as tokens from "~/assets/js/tokens";

const props = defineProps<{
  pokemonName: string;
}>();

const { getPokemon } = usePokedex();

const pokemon: Pokemon = await getPokemon(props.pokemonName);

const { user, isLoggedIn, updateFavorites } = useAuth();

const isFavorite = computed(() => {
  return user.value ? user.value.favorites.includes(pokemon.name) : false;
});

const emit = defineEmits<{
  (event: "updateFavorites", favorites: string[]): void;
}>();

const getType = (pokemon: Pokemon) => {
  const type = pokemon.types[0].type.name;
  return type[0].toUpperCase() + type.slice(1);
};

const favoriteHandler = (event: "add" | "remove") => {
  updateFavorites(props.pokemonName, event);
};
</script>

<template>
  <article
    class="pokemon-card"
    :style="`--background-color: ${
      tokens[`colorPokemonType${getType(pokemon)}` as keyof typeof tokens]
    }`"
  >
    <img
      class="pokemon-card__image"
      :src="pokemon.sprites.other.showdown.front_default"
      alt="pokemon"
    />
    <h2 class="pokemon-card__name">{{ pokemon.name }}</h2>
    <FavoriteButton
      :is-favorite="isFavorite"
      :is-logged-in="isLoggedIn"
      @update-favorites="favoriteHandler"
    />
    <NuxtLink class="pokemon-card__more-info" :to="`/pokemon/${pokemon.name}`">
      More info
    </NuxtLink>
  </article>
</template>

<style scoped lang="scss">
.pokemon-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: linear-gradient(to bottom, var(--background-color) 60%, #e1e1e1);
  border: pxToRem(3) solid $colorPokemonRed;
  border-radius: $borderRadiusRounded;
  padding: pxToRem(10);
  padding-bottom: 0;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05) translateY(-5px);
  }

  &__image {
    height: pxToRem(60);
    object-fit: cover;
    margin-bottom: pxToRem(10);
  }

  &__name {
    text-transform: capitalize;
    margin-top: 0;
    color: $colorTextLight;
  }
  &__more-info {
    margin-top: auto;
    background-color: $colorPokemonRed;
    color: #fff;
    padding: pxToRem(8);
    padding-bottom: 0;
    border-top-left-radius: pxToRem(10);
    border-top-right-radius: pxToRem(10);
  }

  .favorite-container {
    position: absolute;
    bottom: pxToRem(10);
    right: pxToRem(10);
  }
}
</style>
