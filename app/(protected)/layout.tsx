"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { selectIsLoggedIn } from "@/app/app-slice";
import {Header} from "@/components/layout";
import {tokenStorage} from "@/lib/auth/tokenStorage";
import {useMeQuery} from "@/features/auth/api/authApi";
import {useAppSelector} from "@/lib/hooks";

export default function ProtectedLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const router = useRouter();
  const token = tokenStorage.get()

  const {isLoading, isFetching} = useMeQuery(undefined, {skip: !token})

  useEffect(() => {
    if (!token) {
      router.replace("/login")
      return
    }

    if (!isLoggedIn && !isLoading && !isFetching) {
      router.replace("/login")
    }
  }, [token, isLoggedIn, isLoading, isFetching, router])

  return (
    <>
      <Header />
      <main className="p-4">{children}</main>
      </>
  );
}
