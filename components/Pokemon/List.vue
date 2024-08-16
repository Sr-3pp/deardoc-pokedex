<script setup lang="ts">
const { pokemons, loadMore } = usePokedex();
</script>

<template>
  <ul class="pokemon-list">
    <li
      class="pokemon-list-item"
      v-for="pokemon in pokemons"
      :key="pokemon.name"
    >
      <PokemonCard :pokemonName="pokemon.name" />
    </li>
    <li class="pokemon-list-item more">
      <PokemonButton @click="loadMore">Load more</PokemonButton>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  gap: pxToRem(10);
  list-style: none;

  &-item {
    background-color: var(--color-white);
    border-radius: $borderRadiusRounded;
    padding: pxToRem(10);
    width: 100%;

    @media (min-width: 744px) {
      width: calc(33.33333% - pxToRem(10));
    }
    @media (min-width: 1024) {
      width: calc(25% - pxToRem(10));
    }

    .pokemon-card {
      height: 100%;
    }

    &.more {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
