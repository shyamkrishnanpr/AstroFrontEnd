// api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Astrologer {
  _id?: string;
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getAstrologers: builder.query({
      query: () => "api/astrologers",
    }),

    updateAstrologer: builder.mutation<
      Astrologer,
      { id?: string; updatedAstrologer: Astrologer }
    >({
      query: ({
        id,
        updatedAstrologer,
      }: {
        id?: string;
        updatedAstrologer: Astrologer;
      }) => ({
        url: `api/astrologers/${id}`,
        method: "PUT", // Adjust the HTTP method as per your API
        body: updatedAstrologer,
      }),

      onQueryStarted: (query) => {
        console.log(`Query started: ${query}`);
      },
    }),



    createAstrologer: builder.mutation<any, Partial<Astrologer>>({
      query: (astrologer) => ({
        url: 'api/astrologers/register',
        method: 'POST',
        body: astrologer,
      }),
    }),



  }),
});

export const { useGetAstrologersQuery, useUpdateAstrologerMutation, useCreateAstrologerMutation } = api;
