<script lang="ts" setup>
defineProps<{
  isFavorite: boolean;
  isLoggedIn: boolean;
}>();
</script>

<template>
  <label
    :title="isLoggedIn ? 'Add to favorites' : 'Log in to add to favorites'"
    class="favorite-container"
    :class="{ favorite: isFavorite }"
  >
    <button
      class="favorite-button"
      @click="$emit('update-favorites', isFavorite ? 'remove' : 'add')"
      :class="{ disabled: !isLoggedIn }"
    >
      <Icon :name="isFavorite ? 'heart-remove' : 'heart-add'" />
    </button>
  </label>
</template>

<style lang="scss" scoped>
.favorite-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  &.favorite {
    .favorite-button {
      color: #fff;
      background-color: $colorPokemonRed;
      transition: background-color 0.3s;
    }
  }
}
.favorite-button {
  border-style: solid;
  border-width: pxToRem(1);
  border-color: $colorPokemonRed;
  color: #5d5d5d;
  padding: pxToRem(6);
  background-color: #fff;
  border-radius: $borderRadiusPill;
  flex-shrink: 0;
  width: pxToRem(30);
  height: pxToRem(30);
  cursor: pointer;
  &.disabled {
    opacity: 0.3;
    pointer-events: none;
  }
}
.login-message {
  color: red;
  opacity: 0.5;
}
</style>
