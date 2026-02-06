import { NavbarMenu } from "../atoms/NavbarMenu";
import Link from "next/link";
import { ClerkAvatar } from "../atoms/clerkAvatar";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import LocaleSwitcher from "../atoms/LocaleSwitcher";

const locales: Record<string, typeof en> = {
  en,
  es,
};

export default function Navbar({ locale }: { locale: string }) {
  const text = locales[locale] ?? en;
  type linkType = {
    tag: string;
    to: string;
  };
  const links: linkType[] = [
    { tag: `${text.NavBar.Dashboard}`, to: `/${locale}/dashboard` },
    { tag: `${text.NavBar.Demo}`, to: `/${locale}/demo` },
    { tag: `${text.NavBar.ContactUs}`, to: `/${locale}/contactUs` },
    { tag: `${text.NavBar.Request}`, to: `/${locale}/requestService` },
  ];

  return (
    <div className="bg-white w-full rounded-t-2xl px-4 sm:px-6 py-5 flex flex-row justify-between font-semibold">
      <Link className="flex w-fit items-center" href="/">
        Easy Investing
      </Link>
      <div className="flex flex-row w-fit items-center gap-1 sm:gap-2 lg:hidden">
        <ClerkAvatar />
        <LocaleSwitcher />
        <NavbarMenu links={links} />
      </div>
      <div className="hidden lg:flex">
        <div className="flex flex-row w-fit items-center gap-1 md:gap-3">
          {links.map(({ tag, to }) => (
            <Link
              key={tag}
              href={to}
              className="transition hover:bg-sent-purple/40 p-2 rounded-xl"
            >
              {tag}
            </Link>
          ))}
          <LocaleSwitcher />
          <ClerkAvatar />
        </div>
      </div>
    </div>
  );
}
