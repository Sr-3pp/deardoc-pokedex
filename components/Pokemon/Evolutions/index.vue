<script lang="ts" setup>
import type { Pokemon } from "~/interfaces";

const props = defineProps<{
  pokemon: Pokemon;
}>();

const { data }: any = await useAsyncData(async () => {
  const species = await $fetch<{ evolution_chain: { url: string } }>(
    "/api/pokemon/pokemon-species/" + props.pokemon.id
  );
  const chainNumber = species.evolution_chain.url
    .split("/")
    .filter((el: any) => el)
    .pop();
  const evolutionChain = await $fetch<{ chain: [] }>(
    "/api/pokemon/evolution-chain/" + chainNumber
  );
  return {
    evolutions: evolutionChain.chain,
  };
});
const { evolutions } = data.value;
</script>

<template>
  <div class="evolution-tree">
    <h2>Evolutions</h2>
    <PokemonEvolutionsEvolution :node="evolutions" />
  </div>
</template>

<style scoped lang="scss">
.evolution-tree {
  h3 {
    margin-bottom: 1rem;
  }
}
</style>
