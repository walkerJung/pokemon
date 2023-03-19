import { useState } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import { fetchPokemons, searchPokemon } from "./api/pokemon";
import DefaultList from "./component/DefaultList";
import Detail from "./component/Detail";
import Search from "./component/Search";
import SearchList from "./component/SearchList";

function App() {
  const [pokemonId, setPokemonId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pokemonName, setPokemonName] = useState<string>();
  const [keyword, setKeyword] = useState<string | number>();

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

  const { data: searchPokemonData, isLoading: searchLoading } = useQuery(
    ["searchPokemon", { keyword }],
    searchPokemon,
    {
      enabled: !!keyword,
    }
  );

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
      <div className="h-[100px] w-[100%] bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center items-center mb-[15px]">
        <h1 className="text-3xl font-bold underline text-white">
          Hello Pokemon!
        </h1>
      </div>

      {/* 검색 시작 */}
      <Search setKeyword={setKeyword} />
      {/* 검색 끝 */}

      {/* 포켓못 리스트 시작 */}
      {searchPokemonData ? (
        <SearchList
          searchPokemonData={searchPokemonData}
          handleClick={handleClick}
        />
      ) : (
        <>
          <DefaultList pokemonList={pokemonList} handleClick={handleClick} />
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
        </>
      )}
      {/* 포켓못 리스트 시작 */}

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
