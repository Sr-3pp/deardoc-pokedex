<script lang="ts" setup>
const props = defineProps<{
  stats: any[];
}>();
const maxLevel = ref(250);
</script>

<template>
  <div class="pokemon-stats">
    <ul class="pokemon-stats-list">
      <li
        class="pokemon-stats-list-item"
        v-for="stat in stats"
        :key="stat.stat.name"
      >
        <h4>
          {{ stat.stat.name }}
        </h4>
        <span
          class="level-bar"
          :style="{ '--level': stat.base_stat, '--limit': maxLevel }"
        ></span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.pokemon-stats {
  &-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: pxToRem(10);

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: pxToRem(10);
      text-transform: capitalize;
      width: calc(50% - pxToRem(10));

      @media (min-width: 744px) {
        width: calc(33.33333% - pxToRem(10));
      }

      @media (min-width: 1024px) {
        width: calc(33.33333% - pxToRem(10));
      }

      h4 {
        margin: 0;
      }

      .level-bar {
        width: 100%;
        height: pxToRem(20);
        overflow: hidden;
        border-radius: $borderRadiusSoft;
        background-color: $colorPokemonGray;
        position: relative;

        &::before {
          content: "";
          background-color: $colorPokemonYellow;
          position: absolute;
          z-index: 2;
          top: 0%;
          left: 0%;
          width: calc(var(--level) / var(--limit) * 100%);
          height: 100%;
        }
      }
    }
  }
}
</style>
