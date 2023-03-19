import { getPokemonDetail, getPokemonEvolutionChain } from "./api/pokemon";
import { useQuery } from "react-query";

function Detail(props: any) {
  const { pokemonId, pokemonName, setIsModalOpen } = props;

  const {
    isLoading: pokemonDetailIsLoading,
    error: pokemonDetailError,
    data: pokemonDetailData,
  } = useQuery(["pokemonDetail", { pokemonId }], getPokemonDetail);

  const {
    isLoading: getPokemonEvolutionChainLoading,
    error: getPokemonEvolutionChainError,
    data: getPokemonEvolutionChainData,
  } = useQuery(
    ["getPokemonEvolutionChain", { pokemonName }],
    getPokemonEvolutionChain
  );

  if (pokemonDetailIsLoading) {
    return <h1>Loading...!!!</h1>;
  }

  if (pokemonDetailError) {
    return <h1>Error Occurred...!!!</h1>;
  }

  return (
    <div className="fixed top-[20%] w-[420px] h-[50%] rounded-md bg-slate-200">
      <div>
        <header className="flex justify-between">
          <span className="m-[5px] text-xl font-bold">
            {pokemonId}번 포켓몬
          </span>
          <button
            className="bg-sky-500 rounded-md w-[50px] m-[5px] text-white"
            onClick={() => setIsModalOpen(false)}
          >
            닫기
          </button>
        </header>
        <body className="flex flex-col gap-[7px]">
          <label>
            <span className="font-bold">이름 :</span>
            <p>{pokemonDetailData.name}</p>
          </label>
          <label>
            <span className="font-bold">키 : </span>
            <p>{pokemonDetailData.height}</p>
          </label>
          <label>
            <span className="font-bold">무게 : </span>
            <p>{pokemonDetailData.weight}</p>
          </label>
          <label>
            <span className="font-bold">스탯 정보 : </span>
            {pokemonDetailData.stats.map((stat: any) => (
              <p>
                {stat.stat.name} : {stat.base_stat}
              </p>
            ))}
          </label>
          {getPokemonEvolutionChainData?.length && (
            <label>
              <span className="font-bold">진화 정보 : </span>
              {getPokemonEvolutionChainData?.map((item) => (
                <p>
                  {item} {pokemonName === item && "< 현재 진화 단계"}
                </p>
              ))}
            </label>
          )}
        </body>
      </div>
    </div>
  );
}

export default Detail;
