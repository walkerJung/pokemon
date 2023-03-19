const SearchList = (props: any) => {
  const { searchPokemonData, handleClick } = props;
  return (
    <body className="flex flex-wrap justify-center">
      {searchPokemonData && (
        <div
          key={searchPokemonData.id}
          onClick={() =>
            handleClick(searchPokemonData.id, searchPokemonData.name)
          }
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchPokemonData.id}.png`}
          />
          <p className="text-center">{searchPokemonData.name}</p>
        </div>
      )}
    </body>
  );
};

export default SearchList;
