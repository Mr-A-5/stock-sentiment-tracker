"use client";
import Button from "@/components/atoms/Button";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function HomePageButtons() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  return (
    <div className="flex flex-row gap-3 pt-5 justify-center">
      {isSignedIn ? (
        <>
          <button
            className="px-4 py-2 bg-primary text-white rounded"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </button>
        </>
      ) : (
        <>
          <SignUpButton
            mode="redirect"
            signInFallbackRedirectUrl={"/dashboard"}
            signInForceRedirectUrl={"/dashboard"}
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
          >
            <Button color="primary" size="base">
              Sign Up
            </Button>
          </SignUpButton>

          <SignInButton
            mode="redirect"
            signUpFallbackRedirectUrl={"/dashboard"}
            signUpForceRedirectUrl={"/dashboard"}
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
          >
            <Button color="secondary" size="base">
              Sign In
            </Button>
          </SignInButton>
        </>
      )}
    </div>
  );
}
