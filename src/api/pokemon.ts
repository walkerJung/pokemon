export const searchPokemon = async ({ queryKey }: any) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${queryKey[1].keyword}`).then(
    (res) => res.json()
  );
};

export const fetchPokemons = async ({ pageParam = 0 }) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=40`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch pokemons");
  }
  const data = await response.json();
  return { results: data.results, next: data.next ? pageParam + 40 : null };
};

export const getPokemonDetail = async ({ queryKey }: any) => {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon/${queryKey[1].pokemonId}/`
  ).then((res) => res.json());
};

export const getPokemonEvolutionInfo = async ({ queryKey }: any) => {
  return await fetch(
    `https://pokeapi.co/api/v2/evolution-chain/${queryKey[1].pokemonId}/`
  ).then((res) => res.json());
};

export const getPokemonEvolutionChain = async ({ queryKey }: any) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${queryKey[1].pokemonName}`
  );
  const speciesInfo = await response.json();
  const evolutionChainUrl = speciesInfo.evolution_chain.url;
  const evolutionChainResponse = await fetch(evolutionChainUrl);
  const evolutionChainInfo = await evolutionChainResponse.json();
  const evolutionList = [];
  let chain = evolutionChainInfo.chain;
  while (chain) {
    evolutionList.push(chain.species.name);
    chain = chain.evolves_to[0];
  }
  return evolutionList;
};
