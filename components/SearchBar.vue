<script setup lang="ts">
import type { Pokemon } from "~/interfaces";

const search = ref("");
const doSearch = ref(false);
const searching = ref(false);
const results = ref<Pokemon[]>([]);

const { getPokemon } = usePokedex();

const searchPokemon = async () => {
  doSearch.value = true;
  searching.value = true;
  const data = await getPokemon(search.value);
  if (data) {
    results.value = [data];
  } else {
    results.value = [];
  }
  searching.value = false;
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
    <button class="searchbar-button" @click="searchPokemon">
      <Icon name="search" />
    </button>
    <ul class="searchbar-results" v-if="doSearch">
      <li
        class="searchbar-result"
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
      <li class="searchbar-result" v-if="!searching && !results.length">
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
  margin: 0 auto;
  max-width: pxToRem(150);

  @media (min-width: 744px) {
    max-width: pxToRem(300);
  }

  &-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: pxToRem(40);
    height: pxToRem(40);
  }

  input {
    width: 100%;
    padding: pxToRem(10);
    padding-right: pxToRem(30);
    border: 1px solid #ccc;
    border-radius: $borderRadiusSoft;
    &.with-results {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &-results {
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

  &-result {
    border-bottom: pxToRem(1) solid #ccc;
    color: $colorTextDark;

    &:last-child {
      border-bottom: none;
    }

    button,
    span {
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
