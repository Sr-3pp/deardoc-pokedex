import type { Pokemon, PokemonUrl } from "~/interfaces";

export default function usePokedex() {
  const pokemons = ref<PokemonUrl[]>([]);
  const next = ref<string | null>(null);

  const getPokemons = async (url: string = "/api/pokemon") => {
    const data = await $fetch<{
      results: PokemonUrl[];
      count: number;
      next: string;
      previous: string;
    }>(url);
    pokemons.value = [...pokemons.value, ...data.results];
    next.value = data.next;
  };

  const loadMore = async () => {
    if (!next.value) return;
    await getPokemons(next.value);
  };

  const getPokemon = async (name: string) => {
    return await $fetch(`/api/pokemon/${name}`);
  };

  getPokemons();

  return {
    pokemons,
    getPokemons,
    getPokemon,
    loadMore,
  };
}
