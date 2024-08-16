import { Pokemon } from "~/interfaces";

export default defineEventHandler(async (event) => {
  const pokemon = getRouterParam(event, "pokemon");
  const data = await $fetch<Pokemon>(
    `https://pokeapi.co/api/v2/evolution-chain/${pokemon}`
  );
  return data;
});
