import {configureStore} from "@reduxjs/toolkit";
import {appReducer, appSlice} from "@/app/app-slice";
import {baseApi} from "@/lib/api/baseApi";
import {listenMiddleware} from "@/app/listenMiddleware";


export const makeStore = () => {
  return configureStore({
    reducer: {
      [appSlice.name] : appReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .prepend(listenMiddleware.middleware)
      .concat(baseApi.middleware),
  })
}


export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
