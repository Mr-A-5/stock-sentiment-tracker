import "./globals.css";
import { notoSans } from "./fonts";
import ClerkProviderClient from "@/providers/ClerkProviderClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={notoSans.variable}>
      <body>
        <ClerkProviderClient>{children}</ClerkProviderClient>
      </body>
    </html>
  );
}
