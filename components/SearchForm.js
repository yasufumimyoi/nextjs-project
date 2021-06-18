import { useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "@heroicons/react/outline";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm === "") return;
    setSearchTerm("");
    router.push("/result?keyword=" + searchTerm);
  };

  return (
    <form onSubmit={onSubmit} className="relative">
      <SearchIcon className="h-5 text-purple-500 mr-2 absolute top-3 left-2" />
      <input
        className="border px-10 py-2 rounded"
        type="text"
        value={searchTerm}
        onChange={onChange}
        placeholder="Search..."
      />
    </form>
  );
};

export default SearchForm;
