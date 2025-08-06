// src/redux/features/orders/ordersApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

// ❌ DO NOT import backend controller functions into frontend code
// import { getOrderByEmail } from "../../../../../backend/src/orders/order.controller";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrderByEmail: (builder.query)({
      query: (email) => ({
        url: `/email/${email}`,
       
      }),
     providesTags:['Orders']
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByEmailQuery } = ordersApi;
export default ordersApi;
