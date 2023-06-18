import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER }),
  reducerPath: "api",
  endpoints: (build) => ({
    getBooksList: build.query({ query: () => "books" }),
    getNewBooksList: build.query({ query: () => "newbooks" }),
  }),
});

export const { useGetBooksListQuery, useGetNewBooksListQuery } = api;
