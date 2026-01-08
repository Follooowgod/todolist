import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from "@reduxjs/toolkit/query";
import {baseQuery} from "@/lib/api/baseQuery";
import {tokenStorage} from "@/lib/auth/tokenStorage";


export const baseQueryWithReauth: BaseQueryFn<
string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      {url: "/auth/refresh", method: "POST"},
      api,
      extraOptions
    )

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };
      tokenStorage.set(accessToken)
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result;
}