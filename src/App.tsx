import { useQuery } from "react-query";

function App() {
  interface PokemonProps {
    name: string;
    url: string;
  }

  const { isLoading, error, data } = useQuery("pokemonList", () =>
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0").then(
      (res) => res.json()
    )
  );

  if (isLoading) {
    return <h1>Loading...!!!</h1>;
  }

  if (error) {
    return <h1>Error Occurred...!!!</h1>;
  }

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
      <body>
        {data.results.map((pokemon: PokemonProps) => (
          <div key={pokemon.url}>
            <img src="vite.svg" />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </body>
      {/* 포켓못 리스트 시작 */}
      <footer></footer>
    </div>
  );
}

export default App;
