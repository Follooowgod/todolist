import {createListenerMiddleware, isRejectedWithValue} from "@reduxjs/toolkit";
import {toast} from "sonner";

type ErrorType = {
  data?: {
    message?: string[]
    error?: string
  }
  error?: string
}

export const listenMiddleware = createListenerMiddleware()

listenMiddleware.startListening({
  matcher: isRejectedWithValue,
  effect: async (action) => {
    const payload = action.payload as ErrorType | undefined

    const message =
      payload?.data?.message?.[0] ||
      payload?.error ||
      payload?.data?.error ||
      'Something went wrong'
    toast.error(message)
  }
})