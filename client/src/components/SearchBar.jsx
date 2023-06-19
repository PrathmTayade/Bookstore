import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

const SearchBar = ({ onSearch, onClear }) => {
  const [showAdvSearch, setShowAdvSearch] = useState(false);
  const { register, handleSubmit, reset, control } = useForm({
    shouldUnregister: true,
    shouldUseNativeValidation: true,
  });

const onSubmit = (data) => {
  // const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
  //   if (value !== "") {
  //     acc[key] = value;
  //   }
  //   return acc;
  // }, {});

  // console.log(filteredData);
  // Send the filteredData to your desired function or API endpoint

  onSearch(data)
};


  const handleClear = () => {
    reset();
    onClear();
  };

  const categories = ["java", "Internet", "Web"];

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
                  <label htmlFor="option" className="block mb-2">
                    Select an option:
                  </label>
                  <Controller
                    name="categories"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Listbox value={value} onChange={onChange}>
                        <div className="relative">
                          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <span className="block truncate">{value}</span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {categories.map((category) => (
                                <Listbox.Option
                                  key={category}
                                  value={category}
                                  className={({ active }) =>
                                    `${
                                      active
                                        ? "text-white bg-blue-600"
                                        : "text-gray-900"
                                    }
                      cursor-default select-none relative py-2 pl-10 pr-4`
                                  }
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        } block truncate`}
                                      >
                                        {category}
                                      </span>
                                      {selected && (
                                        <span
                                          className={`${
                                            active
                                              ? "text-white"
                                              : "text-blue-600"
                                          } absolute inset-y-0 left-0 flex items-center pl-3`}
                                        >
                                          <CheckIcon
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    )}
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
                {/* <div className="col-span-2">
                  <label className="text-gray-700">Publication Date:</label>
                  <input
                    className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Publication Date"
                    // {...register("publicationDate")}
                  />
                </div> */}
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
