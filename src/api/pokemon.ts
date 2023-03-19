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
