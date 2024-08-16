<script setup lang="ts">
const { pokemons, loadMore } = usePokedex();
</script>

<template>
  <ul class="pokemon-list">
    <li
      class="pokemon-list__item"
      v-for="pokemon in pokemons"
      :key="pokemon.name"
    >
      <PokemonCard :pokemonName="pokemon.name" />
    </li>
    <li class="pokemon-list__item more">
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

  &__item {
    background-color: var(--color-white);
    border-radius: $borderRadiusRounded;
    padding: pxToRem(10);
    width: calc(25% - pxToRem(10));

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
