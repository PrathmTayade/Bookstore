import { useForm } from "react-hook-form";

const SearchBar = ({ onSearch, onClear }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onSearch(data);
  };

  const handleClear = () => {
    reset();
    onClear();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center border-b border-gray-500 p-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search by title or author"
            {...register("search")}
          />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
          <button
            className="flex-shrink-0 bg-gray-500 hover:bg-gray-700 text-sm border-4 border-gray-500 hover:border-gray-700 text-white py-1 px-2 rounded ml-2"
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
