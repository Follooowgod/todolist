"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { selectIsLoggedIn } from "@/app/app-slice";
import {Header} from "@/components/layout";
import {useAppSelector} from "@/components/common/hooks/useAppSelectors";

export default function ProtectedLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) return null

  return (
    <>
      <Header />
      <main className="p-4">{children}</main>
    </>
  );
}
