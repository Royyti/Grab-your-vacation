import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../Api";

const baseQuery = fetchBaseQuery({
    baseUrl: "/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getToken());

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ["FOLLOW", 'VACATION'],
    endpoints: (builder) => ({}),
});