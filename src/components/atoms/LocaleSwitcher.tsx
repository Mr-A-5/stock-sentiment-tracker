"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = segments[0] === "es" ? "es" : "en";

  function switchLocale(locale: "en" | "es") {
    if (segments.length === 0) {
      router.push(`/${locale}`);
      return;
    }

    segments[0] = locale;
    router.push("/" + segments.join("/"));
  }

  const activeClass = "bg-sent-purple text-white";
  const inactiveClass = "cursor-pointer";

  return (
    <div
      className="bg-sent-gray flex rounded-lg gap-1 p-1 px-2
    md:gap-2 md:p-2 md:px-3 text-xs sm:text-base"
    >
      <button
        className={`px-1 md:px-2 py-2 rounded-lg ${
          currentLocale === "en" ? activeClass : inactiveClass
        }`}
        onClick={() => switchLocale("en")}
      >
        EN
      </button>

      <button
        className={`px-1 md:px-2 py-1 rounded-lg ${
          currentLocale === "es" ? activeClass : inactiveClass
        }`}
        onClick={() => switchLocale("es")}
      >
        ES
      </button>
    </div>
  );
}
