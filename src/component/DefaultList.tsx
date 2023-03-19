interface PokemonProps {
  name: string;
  url: string;
}

const DefaultList = (props: any) => {
  const { pokemonList, handleClick } = props;

  const handlePokemonId = (url: string) => {
    const POKEMONID = url.split("/")[6];
    return parseInt(POKEMONID);
  };

  return (
    <body className="flex flex-wrap justify-center">
      {pokemonList.map((pokemon: PokemonProps) => {
        let pokemonId = handlePokemonId(pokemon.url);
        return (
          <div
            key={pokemonId}
            onClick={() => handleClick(pokemonId, pokemon.name)}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            />
            <p className="text-center">{pokemon.name}</p>
          </div>
        );
      })}
    </body>
  );
};

export default DefaultList;
