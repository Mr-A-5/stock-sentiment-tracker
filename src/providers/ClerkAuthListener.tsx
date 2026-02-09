"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export default function ClerkAuthListener() {
  const { isLoaded, isSignedIn } = useUser();
  const prevSignedIn = useRef(isSignedIn);

  useEffect(() => {
    if (!isLoaded) return;

    if (prevSignedIn.current && !isSignedIn) {
      if (typeof window !== "undefined") {
        // reload to force app re-render after sign-out or account deletion
        window.location.reload();
      }
    }

    prevSignedIn.current = isSignedIn;
  }, [isLoaded, isSignedIn]);

  return null;
}
