export default defineEventHandler(async (event) => {
  const { results: types }: any = await $fetch(
    "https://pokeapi.co/api/v2/type"
  );

  return types.map((type: any) => type.name);
});
