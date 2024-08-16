<script setup lang="ts">
const { user } = useAuth();
const favorites = computed<string[]>(() => user.value?.favorites || []);
const { getPokemon } = usePokedex();

const updateFavorites = (favorites: string[]) => {
  user.value!.favorites = favorites;
};

definePageMeta({
  title: "Favorites",
  description: "Your favorite pokemons",
  middleware: "auth",
});
</script>

<template>
  <div class="container">
    <ClientOnly>
      <h1>Favorites of {{ user?.email }}</h1>
      <ul class="pokemon-list">
        <li class="pokemon-list-item" v-for="fav in favorites" :key="fav">
          <PokemonCard :pokemonName="fav" @updateFavorites="updateFavorites" />
        </li>
      </ul>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: pxToRem(10);
  list-style: none;
  padding: 0;
  margin: 0;
  &-item {
    width: 100%;

    @media (min-width: 744px) {
      width: calc(33.33333% - pxToRem(10));
    }

    @media (min-width: 1024px) {
      width: calc(25% - pxToRem(10));
    }
  }
}
</style>
