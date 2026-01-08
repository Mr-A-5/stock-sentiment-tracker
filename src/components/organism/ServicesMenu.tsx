"use client";
import { IoIosArrowForward } from "react-icons/io";
import { type servicesByCompany } from "@/app/functions/services";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Link from "next/link";
import { MdOutlineDesignServices } from "react-icons/md";

export default function ServicesMenu({
  servicesByCompany,
}: {
  servicesByCompany: servicesByCompany[];
}) {
  return (
    <div
      className="bg-white p-4 w-70 max-w-70 rounded-bl-xl min-h-100 h-fit
    hidden
    lg:flex lg:flex-col"
    >
      <h1 className="text-2xl text-black/40 font-extrabold p-2 pt-7 border-b-2 mb-4 h-fit">
        Services
      </h1>
      <div className="flex flex-1 flex-col items-start justify-between h-full">
        <div className="pb-20">
          {servicesByCompany.map(({ company, services }) => (
            <Disclosure key={company} defaultOpen={false}>
              {(open) => (
                <>
                  <DisclosureButton className="flex items-center gap-2 py-2 px-3 rounded-xl transition hover:bg-sent-purple/40">
                    <IoIosArrowForward
                      size={20}
                      className={`transition-transform duration-200 ${
                        open ? "rotate-90" : "rotate-0"
                      }`}
                    />
                    {company}
                  </DisclosureButton>

                  <DisclosurePanel>
                    {services.map((service) => (
                      <div
                        key={company + service.service}
                        className="flex flex-row justify-between items-center py-1 mx-3 text-gray-500 p-1 transition hover:bg-sent-purple/40 rounded-lg px-3 w-full cursor-pointer"
                      >
                        <span className="">{service.service}</span>
                      </div>
                    ))}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
        <div className="pb-2">
          <Link
            href="/requestService"
            className="flex flex-row items-center text-gray-500 transition hover:bg-sent-purple/40 rounded-lg w-full pl-2 pr-6 py-2 cursor-pointer"
          >
            <MdOutlineDesignServices size={22} className="mr-3" />
            Add Service
          </Link>
        </div>
      </div>
    </div>
  );
}
