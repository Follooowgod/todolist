"use client";

import { Provider } from "react-redux";
import {AppStore, makeStore} from "@/app/store/store";
import {useRef} from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (storeRef.current == null) {
    storeRef.current = makeStore();
  }
// eslint-disable-next-line react-hooks/refs
  return <Provider store={storeRef.current}>{children}</Provider>;
}
