<script lang="ts" setup>
const props = defineProps<{
  label: string;
  index?: number;
}>();

const openDropdowns = inject("openDropdowns") as Ref<Set<number>>;
const toggleDropdown = inject("toggleDropdown") as (index: number) => void;

const isOpen = computed(() => openDropdowns.value.has(props.index as number));

const toggle = () => {
  toggleDropdown(props.index as number);
};
</script>

<template>
  <div class="dropdown">
    <button @click="toggle" class="dropdown-label" :class="{ active: isOpen }">
      {{ label }}
      <Icon name="chevron" />
    </button>
    <Transition name="dropdown">
      <div v-show="isOpen" class="dropdown-content" :class="{ active: isOpen }">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  &-label {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: pxToRem(10);
    background-color: var(--color-white);
    border-radius: $borderRadiusRounded;
    cursor: pointer;
    text-transform: capitalize;
    background-color: $colorPokemonGray;
    color: $colorTextLight;
    font-size: pxToRem(18);
    font-weight: bold;

    &.active {
      .icon {
        transform: rotate(180deg);
      }
    }

    .icon {
      width: pxToRem(20);
      height: pxToRem(20);
      transform: rotate(0);
      transition: transform 0.3s;
    }
  }
  &-content {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform-origin: top;
    width: 100%;
    background-color: var(--color-white);
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 $borderRadiusRounded $borderRadiusRounded;
    transition: padding 0.35s ease-in-out;

    &.active {
      padding: pxToRem(10);
    }
  }
}
</style>
