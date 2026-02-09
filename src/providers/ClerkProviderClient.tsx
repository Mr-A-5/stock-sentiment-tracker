"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import ClerkAuthListener from "./ClerkAuthListener";

export default function ClerkProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <ClerkProvider>
      <ClerkAuthListener />
      {children}
    </ClerkProvider>
  );
}
