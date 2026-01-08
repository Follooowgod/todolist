import {
  createSlice,
  isFulfilled,
  isPending, isRejected,
  PayloadAction
} from "@reduxjs/toolkit";
import {RequestStatus} from "@/components/common/types";
import {todolistsApi} from "@/features/todolist/api/todolistApi";
import {tasksApi} from "@/features/tasks/api/taskApi";

type ThemeMode = 'light' | 'dark'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
    isLoggedIn: false,
    status: 'idle' as RequestStatus,
    error: null as string | null
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error
  },
  reducers: {
    changeThemeModeAC: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload
    },
    setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatus }>) => {
      state.status = action.payload.status;
    },
    setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setIsLoggedInAC: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (
          todolistsApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed"
      })
  },
})

export const {selectThemeMode, selectIsLoggedIn, selectAppStatus, selectAppError} = appSlice.selectors
export const {changeThemeModeAC, setAppErrorAC, setAppStatusAC, setIsLoggedInAC} = appSlice.actions
export const appReducer = appSlice.reducer



