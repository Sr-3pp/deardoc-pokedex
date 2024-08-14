<script setup lang="ts">
import type { PokemonUrl } from "~/interfaces";

const { pokemons, loadMore } = usePokedex();
</script>

<template>
  <ul class="pokemon-list">
    <li
      class="pokemon-list__item"
      v-for="pokemon in pokemons"
      :key="pokemon.name"
    >
      <NuxtLink :to="`/pokemon/${pokemon.name}`">
        <PokemonCard :pokemonName="pokemon.name" />
      </NuxtLink>
    </li>
    <li class="pokemon-list__item more">
      <button @click="loadMore">Load more</button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: pxToRem(10);
  list-style: none;

  &__item {
    background-color: var(--color-white);
    border-radius: #{pxToRem(10)};
    padding: #{pxToRem(10)};

    &.more {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
