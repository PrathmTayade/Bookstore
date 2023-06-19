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
    onSearch(data);
  };

  const handleClear = () => {
    reset();
    onClear();
  };

  const categories = [
    "Open Source",
    "Mobile",
    "Java",
    "Software Engineering",
    "Internet",
    "Web Development",
    "Miscellaneous",
    "Microsoft .NET",
    "Microsoft",
    "Next Generation Databases",
    "PowerBuilder",
    "Client-Server",
    "Computer Graphics",
    "Object-Oriented Programming",
    "Networking",
    "Theory",
    "Programming",
    "Python",
    "Mobile Technology",
    "Business",
    "XML",
    "Perl",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="flex items-center gap-4">
        <input
          className="flex-grow appearance-none bg-transparent border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="text"
          placeholder="Search a book"
          {...register("title")}
        />

        <button
          className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
          type="submit"
        >
          {showAdvSearch ? "Apply advanced search" : "Search"}
        </button>
      </div>

      <div className="py-4">
        <div className="flex justify-end gap-5">
          <button
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            onClick={() => setShowAdvSearch(!showAdvSearch)}
          >
            {showAdvSearch ? "Hide Advanced options" : "Show Advanced options"}
          </button>
        </div>

        {showAdvSearch && (
          <div className="grid grid-cols-2 gap-4 mt-1">
            <div>
              <label
                htmlFor="categories"
                className="block  text-sm p-1 font-semibold"
              >
                Filter by Category:
              </label>
              <Controller
                name="categories"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Listbox value={value} onChange={onChange}>
                    {({ open }) => (
                      <>
                        <div className="relative">
                          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <span className="block truncate">
                              {value ? value : "Select Category"}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg
                                className={`w-5 h-5 ${
                                  open ? "transform rotate-180" : ""
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </span>
                          </Listbox.Button>
                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            >
                              {categories.map((category) => (
                                <Listbox.Option
                                  key={category}
                                  value={category}
                                  className={({ active }) =>
                                    `${
                                      active
                                        ? "text-white bg-blue-600"
                                        : "text-gray-900"
                                    } cursor-default select-none relative py-2 pl-10 pr-4`
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
                      </>
                    )}
                  </Listbox>
                )}
              />
            </div>
            <div>
              <label className="block  text-sm p-1 font-semibold">
                Fiter by Price range:
              </label>
              <div className="flex">
                <input
                  className="flex-grow appearance-none bg-transparent  border border-gray-300 rounded-l-md py-2 px-4 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  type="number"
                  placeholder="Min Price"
                  {...register("minPrice", {
                    min: 0,
                    max: 1000,
                    valueAsNumber: true,
                  })}
                />
                <input
                  className="flex-grow appearance-none bg-transparent border border-l-0 border-gray-300 rounded-r-md py-2 px-4 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
