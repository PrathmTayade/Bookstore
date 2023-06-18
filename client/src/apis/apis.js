import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER,
  }),
  reducerPath: "api",
  endpoints: (build) => ({
    getBooksList: build.query({ query: () => "books" }),
    getNewBooksList: build.query({ query: () => "newbooks" }),
    searchBooks: build.mutation({
      query: (searchTerms) => ({
        url: "newbooks/search",
        method: "POST",
        body: searchTerms,
      }),
    }),
  }),
});

export const {
  useGetBooksListQuery,
  useGetNewBooksListQuery,
  useSearchBooksMutation,
} = api;
