"use client";
import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";

type linkType = {
  tag: string;
  to: string;
};

export function NavbarMenu({ links }: { links: linkType[] }) {
  return (
    <Menu as={"div"} className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full justify-center rounded-md bg-sent-gray/20 px-1 md:px-4 py-2 text-sm font-semibold text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
        <IoMenu size={30} />
      </MenuButton>
      <MenuItems className="p-3 absolute right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="px-1 py-1 flex flex-col gap-4">
          {links.map(({ tag, to }) => (
            <MenuItem key={tag}>
              <Link href={to}>{tag}</Link>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
