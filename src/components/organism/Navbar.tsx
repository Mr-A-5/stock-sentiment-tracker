import { NavbarMenu } from "../atoms/NavbarMenu";
import Link from "next/link";
import { ClerkAvatar } from "../atoms/clerkAvatar";

export default function Navbar() {
  type linkType = {
    tag: string;
    to: string;
  };
  const links: linkType[] = [
    { tag: "Dashboard", to: "/dashboard" },
    { tag: "Demo", to: "/demo" },
    { tag: "Contact Us", to: "/contactUs" },
    { tag: "Request Services", to: "/requestService" },
  ];

  return (
    <div className="bg-white rounded-t-2xl px-6 py-5 flex flex-row justify-between font-semibold">
      <Link className="flex items-center" href="/">
        Easy Investing
      </Link>
      <div className="flex flex-row w-fit items-center gap-2 md:hidden">
        <ClerkAvatar />
        <NavbarMenu links={links} />
      </div>
      <div className="hidden md:flex">
        <div className="flex flex-row w-fit items-center gap-6">
          {links.map(({ tag, to }) => (
            <Link key={tag} href={to}>
              {tag}
            </Link>
          ))}
          <ClerkAvatar />
        </div>
      </div>
    </div>
  );
}
