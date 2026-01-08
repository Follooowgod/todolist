import {configureStore} from "@reduxjs/toolkit";
import {appReducer, appSlice} from "@/app/app-slice";
import {baseApi} from "@/lib/api/baseApi";
import {listenMiddleware} from "@/app/listenMiddleware";


export const store = configureStore({
  reducer: {
    [appSlice.name] : appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .prepend(listenMiddleware.middleware)
    .concat(baseApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
