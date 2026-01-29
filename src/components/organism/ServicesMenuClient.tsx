"use client";

import dynamic from "next/dynamic";
import { servicesByCompany } from "@/app/functions/services";

const ServicesMenu = dynamic(() => import("./ServicesMenu"), { ssr: false });

export default function ServicesMenuClient({
  servicesByCompany,
  locale,
}: {
  servicesByCompany: servicesByCompany[];
  locale: string;
}) {
  return <ServicesMenu servicesByCompany={servicesByCompany} locale={locale} />;
}
