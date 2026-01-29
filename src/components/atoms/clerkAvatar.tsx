"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function ClerkAvatar({}) {
  return (
    <div className="flex w-fit justify-center items-center px-1 md:px-3 py-1">
      <SignedIn>
        <UserButton></UserButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="rounded-lg p-1 py-2 bg-black text-white cursor-pointer w-fit">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
