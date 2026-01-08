import {BaseResponse} from "@/components/common/types";
import {baseApi} from "@/lib/api/baseApi";
import {LoginInputs} from "@/features/auth/schemas/loginschema";
import {tokenStorage} from "@/lib/auth/tokenStorage";
import {setIsLoggedInAC} from "@/app/app-slice";
import {ResultCode} from "@/components/common/enums";
import {BaseQueryArg} from "@reduxjs/toolkit/query";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
      query: (body) => ({ method: "post", url: "auth/login", body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const {data} = await queryFulfilled
          if (data.resultCode === ResultCode.Success) {
            tokenStorage.set(data.data.token);
            dispatch(setIsLoggedInAC({ isLoggedIn: true }));
          } else {
            tokenStorage.remove();
            dispatch(setIsLoggedInAC({ isLoggedIn: false }));
          }
        } catch {
          tokenStorage.remove();
          dispatch(setIsLoggedInAC({ isLoggedIn: false }));
        }
      },
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({ method: "delete", url: "auth/login" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          tokenStorage.remove();
          dispatch(setIsLoggedInAC({ isLoggedIn: false }));
          dispatch(baseApi.util.resetApiState());
        }
      },

      invalidatesTags: ["Auth"],
    }),
    me: builder.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => "auth/me",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.resultCode === ResultCode.Success) {
            dispatch(setIsLoggedInAC({ isLoggedIn: true }));
          } else {
            dispatch(setIsLoggedInAC({ isLoggedIn: false }));
          }
        } catch {
          dispatch(setIsLoggedInAC({ isLoggedIn: false }));
        }
      },
      providesTags: ["Auth"],
    }),
    getCaptchaUrl: builder.query<BaseResponse<{url: string}>, void>({
      query: () => "security/get-captcha-url",
      })
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery, useLazyGetCaptchaUrlQuery } = authApi