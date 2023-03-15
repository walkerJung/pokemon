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
    return <div>로오딩중</div>;
  }

  if (error) {
    return <div>데이터를 불러오는중 에러가 발생하였습니다</div>;
  }

  return (
    <div className="">
      <div className="h-14 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      <div className="h-14 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <header>
        <input
          type={"text"}
          name={"keyword"}
          placeholder={"포켓몬 번호를 검색해보세요!"}
        />
        <input type={"submit"} value={"검색하기"} />
      </header>
      <body>
        {data.results.map((pokemon: PokemonProps) => (
          <div key={pokemon.url}>
            <img src="vite.svg" />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </body>
      <footer></footer>
    </div>
  );
}

export default App;
