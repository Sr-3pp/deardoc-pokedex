<script setup lang="ts">
const loading: Ref<boolean> = ref(false);

loading.value = false;
</script>

<template>
  <div>
    <Transition name="fade">
      <Loader v-if="loading" />
      <div v-else>
        <h1>Pokédex</h1>
        <PokemonList />
      </div>
    </Transition>
  </div>
</template>
