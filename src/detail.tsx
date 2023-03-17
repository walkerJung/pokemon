import { getPokemonDetail } from "./api/pokemon";
import { useQuery } from "react-query";

function Detail(props: any) {
  const { pokemonId, setIsModalOpen } = props;

  const { isLoading, error, data } = useQuery(
    ["pokemonDetail", { pokemonId }],
    getPokemonDetail
  );

  if (isLoading) {
    return <h1>Loading...!!!</h1>;
  }

  if (error) {
    return <h1>Error Occurred...!!!</h1>;
  }

  console.log("detailData", data);
  return (
    <div className="fixed top-[20%] w-[420px] h-[50%] rounded-md bg-slate-700">
      <div className="flex justify-between ">
        <span className="text-white m-[5px]">{pokemonId}번 포켓몬</span>
        <button
          className="bg-sky-500 rounded-md w-[50px] m-[5px] text-white"
          onClick={() => setIsModalOpen(false)}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default Detail;
