import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { notoSans } from "./fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={notoSans.variable}>
      <body>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
