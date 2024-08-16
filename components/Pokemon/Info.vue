<script lang="ts" setup>
import type { Pokemon } from "~/interfaces";
import * as tokens from "~/assets/js/tokens";

const props = defineProps<{
  pokemon: Pokemon;
}>();

const { user, isLoggedIn, updateFavorites } = useAuth();

const { data }: any = await useAsyncData(async () => {
  const gender = await $fetch("/api/pokemon/gender/" + props.pokemon.id);
  const abilityArray = props.pokemon.abilities.map((el) => {
    const abilityNumber = el.ability.url
      .split("/")
      .filter((el) => el)
      .pop();

    return "/api/pokemon/ability/" + abilityNumber;
  });

  const abilities: any = await Promise.all(
    abilityArray.map((ab) => $fetch(ab))
  );
  return {
    gender,
    abilities,
  };
});

const { gender, abilities } = data.value;

const getTypesColor = (type: string) => {
  const typeName = type[0].toUpperCase() + type.slice(1);
  return (tokens as any)[`colorPokemonType${typeName}`];
};

const getEffect = (effects: any) => {
  const { effect } = effects.find((eff: any) => eff.language.name === "en");
  return effect;
};
</script>

<template>
  <div class="pokemon-info">
    <div class="pokemon-info-header">
      <h2 class="pokemon-info-title">{{ pokemon.name }}</h2>
      <ClientOnly>
        <FavoriteButton
          :is-favorite="user?.favorites.includes(pokemon.name)"
          :is-logged-in="isLoggedIn"
          @updateFavorites="updateFavorites(pokemon.name, $event)"
        />
      </ClientOnly>
    </div>
    <ul class="pokemon-info-general">
      <li>
        <p>Weight:</p>
        <span>{{ pokemon.weight / 10 }}KG</span>
      </li>
      <li>
        <p>Height:</p>
        <span>{{ pokemon.height / 10 }}M</span>
      </li>
      <li v-if="gender.name">
        <p>Gender:</p>
        <span> {{ gender.name }}</span>
      </li>
    </ul>

    <h3>Abilities:</h3>
    <DropdownGroup class="pokemon-info-abilities">
      <Dropdown
        v-for="(ability, i) in abilities"
        :key="ability.name"
        :index="i"
        :label="ability.name"
      >
        <p>{{ getEffect(ability.effect_entries) }}</p>
      </Dropdown>
    </DropdownGroup>
    <h3>Types:</h3>
    <ul class="pokemon-info-types">
      <li
        class="pokemon-info-types__type"
        :style="{ '--background-color': getTypesColor(type.type.name) }"
        v-for="type in pokemon.types"
        :key="type.type.name"
      >
        {{ type.type.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.pokemon-info {
  width: 100%;
  &-title {
    text-transform: capitalize;
  }
  &-types,
  &-abilities,
  &-general {
    display: flex;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    flex-wrap: wrap;
    margin-bottom: pxToRem(20);

    li {
      padding: pxToRem(10);
      text-align: center;
      p {
        font-weight: bold;
        margin: 0;
        text-transform: capitalize;
      }
    }

    &__type {
      background-color: var(--background-color);
      border-radius: $borderRadiusSoft;
      color: $colorTextLight;
      padding: pxToRem(8);
      text-transform: capitalize;
    }
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      margin-bottom: 0;
    }
  }

  &-general {
    background-color: $colorPokemonGray;
    color: $colorTextLight;
    justify-content: space-between;
    padding: pxToRem(20);
    border-radius: $borderRadiusSoft;
  }
}
</style>
