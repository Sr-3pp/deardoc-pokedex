<script lang="ts" setup></script>

<template>
  <button class="pokemon-button">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.pokemon-button {
  background-color: $colorBackgroundLight;
  color: $colorPokemonRed;
  border: {
    style: solid;
    width: pxToRem(2);
    color: $colorPokemonRed;
  }
  border-radius: $borderRadiusPill;
  padding: pxToRem(10) pxToRem(20);
  cursor: pointer;
  font-weight: bold;
  font-size: pxToRem(14);
  transition: background-color 0.3s;
  &:hover {
    background-color: $colorPokemonRed;
    color: $colorTextLight;
  }
}
</style>
