import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function ClerkAvatar({}) {
  return (
    <>
      <SignedIn></SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-3 py-1 rounded-lg bg-black text-white">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
