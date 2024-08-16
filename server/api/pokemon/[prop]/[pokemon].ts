export default defineEventHandler(async (event) => {
  const pokemon = getRouterParam(event, "pokemon");
  const prop = getRouterParam(event, "prop");
  try {
    const data = await $fetch(`https://pokeapi.co/api/v2/${prop}/${pokemon}`);
    return data;
  } catch (error) {
    return {};
  }
});
