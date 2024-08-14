<script setup lang="ts">
import type { Pokemon } from "~/interfaces";

const search = ref("");
const doSearch = ref(false);
const results = ref<Pokemon[]>([]);

const searchPokemon = async () => {
  doSearch.value = true;
  const { data } = await useFetch<Pokemon>(`/api/pokemon/${search.value}`);
  results.value = data.value ? [data.value] : [];
};

const pokemonDetails = (name: string) => {
  navigateTo(`/pokemon/${name}`);
  clearSearch();
};

const clearSearch = () => {
  results.value = [];
  doSearch.value = false;
  search.value = "";
};

watch(search, () => {
  if (search.value.length == 0) {
    results.value = [];
    doSearch.value = false;
  }
});
</script>

<template>
  <div class="searchbar">
    <input
      v-model="search"
      type="text"
      placeholder="Search for a pokemon"
      @keyup.enter="searchPokemon"
      @keyup.esc="clearSearch"
      :class="{ 'with-results': results.length > 0 }"
    />
    <button @click="searchPokemon">Search</button>
    <ul class="searchbar__results" v-if="results.length > 0">
      <li
        class="searchbar__result"
        v-for="pokemon in results"
        :key="pokemon.name"
        v-if="results.length > 0 && doSearch"
      >
        <button @click="pokemonDetails(pokemon.name)">
          <img :src="pokemon.sprites.front_default" alt="pokemon image" />
          <span>
            {{ pokemon.name }}
          </span>
        </button>
      </li>
      <li class="searchbar__result" v-else-if="doSearch">
        <span>No results found</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.searchbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: pxToRem(300);
  margin: 0 auto;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: pxToRem(5);
    &.with-results {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &__results {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    border-bottom-left-radius: pxToRem(5);
    border-bottom-right-radius: pxToRem(5);
  }

  &__result {
    border-bottom: pxToRem(1) solid #ccc;

    &:last-child {
      border-bottom: none;
    }

    button {
      display: flex;
      align-items: center;
      gap: pxToRem(10);
      width: 100%;
      padding: pxToRem(10);
      background-color: transparent;
      border: none;
      margin: 0;
      cursor: pointer;

      span {
        margin: auto;
      }
    }
  }
}
</style>
