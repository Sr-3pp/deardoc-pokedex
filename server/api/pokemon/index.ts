export default defineEventHandler(async (event) => {
  const pokemon = await $fetch("https://pokeapi.co/api/v2/pokemon");
  return pokemon;
});
