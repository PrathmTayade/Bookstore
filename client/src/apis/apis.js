import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER }),
  reducerPath: "api",
  endpoints: (build) => ({
    getBooksList: build.query({ query: () => "books" }),
    getNewBooksList: build.query({ query: () => "newbooks" }),
    searchBooks: build.query({
      query: (searchTerm) => `newbooks/search?search=${searchTerm}`,
    }),
  }),
});

export const {
  useGetBooksListQuery,
  useGetNewBooksListQuery,
  useSearchBooksQuery,
} = api;
