<script setup lang="ts">
import type { Pokemon } from "~/interfaces";
import * as tokens from "~/assets/js/tokens";

const route = useRoute();
const { data, error } = await useFetch<Pokemon>(
  `/api/pokemon/${route.params.pokemon}`
);
if (error.value) {
  throw createError({
    statusCode: 404,
    message: "Pokemon not found",
  });
}

const getTypesColor = (type: string) => {
  const typeName = type[0].toUpperCase() + type.slice(1);
  return (tokens as any)[`colorPokemonType${typeName}`];
};
</script>

<template>
  <div class="container">
    <div class="pokemon-info-header">
      <figure
        class="pokemon-info-picture"
        :style="{'--type': getTypesColor(data!.types[0].type.name)}"
      >
        <img
          :src="data?.sprites.other['official-artwork'].front_default"
          :alt="data?.name"
        />
      </figure>
      <PokemonInfo :pokemon="data!" />
    </div>
    <PokemonStats :stats="data!.stats" />
    <PokemonEvolutions :pokemon="data!" />
  </div>
</template>

<style lang="scss" scoped>
.pokemon-info {
  &-header {
    display: flex;
    flex-direction: column;

    @media (min-width: 744px) {
      flex-direction: row;
    }
  }

  &-picture {
    margin-right: 1rem;
    position: relative;
    background: radial-gradient(
      circle,
      var(--type) 0%,
      $colorBackgroundLight 68%
    );
    border-radius: $borderRadiusPill;

    img {
      width: 100%;
      height: auto;
    }
    .favorite {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      align-items: flex-start;
    }
  }
}
.pokemon-stats {
  margin-bottom: pxToRem(40);
}
</style>
