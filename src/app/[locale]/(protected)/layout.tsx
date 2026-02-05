import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedOut>
        <div className="bg-sent-gray flex min-h-screen items-center justify-center rounded-b-xl">
          <RedirectToSignIn />
        </div>
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </>
  );
}
