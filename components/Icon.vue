<script lang="ts" setup>
withDefaults(
  defineProps<{
    name: string;
    kind?: string;
  }>(),
  {
    kind: "s",
  }
);
</script>

<template>
  <svg class="icon">
    <use :href="`/icons/${name}.svg#${kind}`" />
  </svg>
</template>

<style scoped lang="scss">
.icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>
