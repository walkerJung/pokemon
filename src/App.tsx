import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchPokemons } from "./api/pokemon";
import Detail from "./detail";

interface PokemonProps {
  name: string;
  url: string;
}

function App() {
  const [pokemonId, setPokemonId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pokemonName, setPokemonName] = useState<string>();

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery("pokemons", fetchPokemons, {
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const handlePokemonId = (url: string) => {
    const POKEMONID = url.split("/")[6];
    return parseInt(POKEMONID);
  };

  const handleClick = (id: number, name: string) => {
    setPokemonName(name);
    setPokemonId(id);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <h1>Loading...!!!</h1>;
  }

  if (error) {
    return <h1>Error Occurred...!!!</h1>;
  }

  const pokemonList = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="flex flex-col my-0 mx-auto w-[420px]">
      {/*  */}
      <div className="h-[100px] w-[100%] bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center items-center mb-[15px]">
        <h1 className="text-3xl font-bold underline text-white">
          Hello Pokemon!
        </h1>
      </div>
      {/*  */}

      {/* 검색 시작 */}
      <header className="border-indigo-500/50 mb-[15px] flex gap-[15px] w-[100%]">
        <input
          className="rounded-md border-2 border-indigo-500/50 w-[70%]"
          type={"text"}
          name={"keyword"}
          placeholder={"포켓몬 번호를 검색해보세요!"}
        />
        <input
          className="rounded-md border-2 border-indigo-500/50 w-[30%]"
          type={"submit"}
          value={"검색"}
        />
      </header>
      {/* 검색 끝 */}

      {/* 포켓못 리스트 시작 */}
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
      {/* 포켓못 리스트 시작 */}
      <button
        className="m-5"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading...!!!"
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>

      {/* 포켓몬 상세보기 시작 */}
      {isModalOpen && (
        <Detail
          pokemonId={pokemonId}
          pokemonName={pokemonName}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {/* 포켓몬 상세보기 끝 */}
    </div>
  );
}

export default App;
