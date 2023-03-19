const Search = (props: any) => {
  const { setKeyword } = props;
  return (
    <header className="border-indigo-500/50 mb-[15px] flex gap-[15px] w-[100%]">
      <input
        className="rounded-md border-2 border-indigo-500/50 w-[100%]"
        type={"text"}
        name={"keyword"}
        placeholder={"포켓몬 번호를 검색해보세요!"}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
    </header>
  );
};

export default Search;
