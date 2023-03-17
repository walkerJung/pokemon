export const getPokemonList = async () => {
  return await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  ).then((res) => res.json());
};

export const getPokemonDetail = async ({ queryKey }: any) => {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon/${queryKey[1].pokemonId}/`
  ).then((res) => res.json());
};
