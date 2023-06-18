import { useState } from "react";
import { useForm } from "react-hook-form";

const SearchBar = ({ onSearch, onClear }) => {
  const [showAdvSearch, setShowAdvSearch] = useState(false);
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
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="flex items-center border shadow-md rounded-md p-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search a book"
            {...register("title")}
          />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
        </div>

        {/* Advanced Search */}
        <div className="p-4 ">
          <div className="flex justify-end gap-5">
            <button
              className="text-blue-500 hover:text-blue-700 text-sm font-medium "
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700 text-sm font-medium "
              onClick={() => setShowAdvSearch(!showAdvSearch)}
            >
              {showAdvSearch
                ? "Hide Advanced options"
                : "Show Advanced options"}
            </button>
          </div>

          {showAdvSearch && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700">categories:</label>
                  <input
                    className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="categories"
                    // {...register("categories")}
                  />
                </div>
                <div>
                  <label className="text-gray-700">Price Range:</label>
                  <div className="flex">
                    <input
                      className="border border-gray-300 rounded-l py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="number"
                      placeholder="Min Price"
                      {...register("minPrice", {
                        min: 0,
                        max: 1000,
                        valueAsNumber: true,
                      })}
                    />
                    <input
                      className="border border-l-0 border-gray-300 rounded-r py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="number"
                      placeholder="Max Price"
                      {...register("maxPrice", {
                        min: 100,
                        max: 1000,
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-gray-700">Publication Date:</label>
                  <input
                    className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Publication Date"
                    // {...register("publicationDate")}
                  />
                </div>
              </div>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded"
                type="submit"
              >
                Apply Advanced Search
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default SearchBar;
