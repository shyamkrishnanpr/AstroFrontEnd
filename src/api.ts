// api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getAstrologers: builder.query({
      query: () => "api/astrologers",
    }),
  }),
});

export const { useGetAstrologersQuery } = api;
