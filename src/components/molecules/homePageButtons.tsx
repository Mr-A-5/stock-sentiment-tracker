"use client";
import Button from "@/components/atoms/Button";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const locales: Record<string, typeof en> = {
  en,
  es,
};

type PageProps = {
  params: {
    locale: string;
  };
};

export function HomePageButtons({ locale }: { locale: string }) {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const text = locales[locale] ?? en;
  return (
    <div className="flex flex-row gap-3 pt-5 items-center justify-center">
      {isSignedIn ? (
        <>
          <Button
            color="primary"
            size="base"
            onClick={() => router.push(`${locale}/dashboard`)}
          >
            {text.HomeButtons.Dash}
          </Button>
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
              {text.HomeButtons["Sign up"]}
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
              {text.HomeButtons["Sign In"]}
            </Button>
          </SignInButton>
        </>
      )}
    </div>
  );
}
