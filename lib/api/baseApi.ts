import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "@/lib/api/baseQueryWithReauth";


export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Todolist', 'Task'],
  endpoints: () => ({}),
})