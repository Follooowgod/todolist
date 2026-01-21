import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tokenStorage } from "@/lib/auth/tokenStorage";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("API-KEY", process.env.NEXT_PUBLIC_API_KEY!);

    const token = tokenStorage.get()
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }
})

