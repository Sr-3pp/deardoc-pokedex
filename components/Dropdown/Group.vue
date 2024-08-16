<script setup lang="ts">
const props = defineProps<{
  multiple?: boolean;
}>();

const openDropdowns = ref<Set<number>>(new Set());

const toggleDropdown = (index: number) => {
  if (props.multiple) {
    if (openDropdowns.value.has(index)) {
      openDropdowns.value.delete(index);
    } else {
      openDropdowns.value.add(index);
    }
  } else {
    if (openDropdowns.value.has(index)) {
      openDropdowns.value.clear();
    } else {
      openDropdowns.value.clear();
      openDropdowns.value.add(index);
    }
  }
};

provide("openDropdowns", openDropdowns);
provide("toggleDropdown", toggleDropdown);
</script>

<template>
  <div class="dropdown-group">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.dropdown-group {
  display: flex;
  flex-direction: column;
  gap: pxToRem(10);

  .dropdown {
    width: 100%;
  }
}
</style>
