<script lang="ts" setup>
defineProps<{
  node: any; // Replace 'any' with a more specific type if available
}>();
</script>

<template>
  <div class="evolution-node">
    <div class="evolution-node-current">
      <PokemonCard :pokemon-name="node.species.name" />
    </div>
    <div v-if="node.evolves_to.length > 0" class="evolution-children">
      <PokemonEvolutionsEvolution
        v-for="evolution in node.evolves_to"
        :key="evolution.species.name"
        :node="evolution"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.evolution-node {
  display: flex;
  align-items: center;
  gap: pxToRem(10);
  width: 100%;

  &-current {
    width: pxToRem(200);
    flex-shrink: 0;
  }
}

.evolution-children {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: pxToRem(10);
  .evolution-node {
    width: auto;
  }
}

.evolution-children > * {
  margin: 0 10px;
}
</style>
