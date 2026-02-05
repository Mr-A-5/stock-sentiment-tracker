"use client";

import { useEffect, useState } from "react";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useUser } from "@clerk/nextjs";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const locales: Record<string, typeof en> = {
  en,
  es,
};

type Row = {
  companyId: number | null;
  serviceIds: number[];
};

type Company = {
  id: number;
  name: string;
};

type Service = {
  id: number;
  service: string;
};

type Props = {
  servicesMap: Record<
    string,
    { Name: string; Services: { id: string; name: string }[] }
  >;
  locale: string;
};

export default function RequestServicesForm({ locale, servicesMap }: Props) {
  const text = locales[locale] ?? en;
  const { user, isLoaded, isSignedIn } = useUser();
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [rows, setRows] = useState<Row[]>([
    { companyId: null, serviceIds: [] },
  ]);

  // Derive an array of companies with their services from the provided servicesMap prop
  const companyServices = Object.entries(servicesMap ?? {}).map(
    ([key, val]) => ({
      companyId: Number(key),
      name: val.Name,
      services: (val.Services ?? []).map((s) => ({
        id: Number(s.id),
        name: s.name,
      })),
    }),
  );

  if (!isSignedIn || !user) return <p>Not signed in</p>;

  function updateCompany(rowIndex: number, companyId: number) {
    setRows((prev) =>
      prev.map((row, i) => (i === rowIndex ? { ...row, companyId } : row)),
    );
  }

  function toggleService(rowIndex: number, serviceId: number) {
    setRows((prev) =>
      prev.map((row, i) =>
        i === rowIndex
          ? {
              ...row,
              serviceIds: row.serviceIds.includes(serviceId)
                ? row.serviceIds.filter((id) => id !== serviceId)
                : [...row.serviceIds, serviceId],
            }
          : row,
      ),
    );
  }

  function addRow() {
    const lastRow = rows[rows.length - 1];
    if (!lastRow.companyId || lastRow.serviceIds.length === 0) return;

    setRows((prev) => [...prev, { companyId: null, serviceIds: [] }]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    const payload = {
      selections: rows.map((row) => ({
        company_id: row.companyId,
        service_ids: row.serviceIds,
      })),
    };

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        return;
      }
      setStatus({
        type: "success",
        message: text["Request Services"].Status,
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Unexpected error",
      });
    }
  }
  return (
    <>
      {status && (
        <Alert
          color={status.type === "success" ? "success" : "failure"}
          className="mb-4 w-fit px-5"
          onDismiss={() => setStatus(null)}
        >
          {status.message}
        </Alert>
      )}
      {!status && (
        <div
          className=" bg-sent-gray pt-5 rounded-xl h-fit
          lg:w-3/5"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
            <div className="flex w-full justify-center pb-3 border-b-4">
              <Label className="w-fit text-3xl font-extrabold" color="gray">
                {text["Request Services"].Title}
              </Label>
            </div>
            <div
              className="flex flex-col w-full gap-7
              lg:flex-row"
            >
              <div className="lg:w-1/2">
                <Label className="text-xl p-1 px-3" color="gray">
                  {text["Request Services"].Name}
                </Label>
                <TextInput
                  disabled
                  value={user.fullName ?? ""}
                  className="m-1"
                  color="info"
                />
              </div>

              <div className="lg:w-1/2">
                <Label className="text-xl p-1 px-3" color="gray">
                  {text["Request Services"].Email}
                </Label>
                <TextInput
                  disabled
                  value={user.emailAddresses[0]?.emailAddress ?? ""}
                  className="m-1 "
                  color="info"
                />
              </div>
            </div>
            <div className="gap-3">
              <Label className="text-xl px-3" color="gray">
                {text["Request Services"].SubTitle}
              </Label>
              {rows.map((row, index) => {
                const selectedCompany = companyServices.find(
                  (c) => c.companyId === row.companyId,
                );

                return (
                  <div
                    key={index}
                    className="rounded-xl border bg-white p-4 mt-2"
                  >
                    <Label>Stock</Label>
                    <select
                      className="mt-1 w-full rounded-lg border p-2"
                      value={row.companyId ?? ""}
                      onChange={(e) =>
                        updateCompany(index, Number(e.target.value))
                      }
                    >
                      <option value="">
                        {text["Request Services"].Select}
                      </option>
                      {companyServices.map((company) => (
                        <option
                          key={company.companyId}
                          value={company.companyId}
                        >
                          {company.name}
                        </option>
                      ))}
                    </select>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedCompany?.services.length == 0 ? (
                        <label
                          className={`rounded-full px-3 py-1 text-sm transition1 bg-gray-200 hover:bg-gray-300`}
                        >
                          No additional services for this company are available
                        </label>
                      ) : (
                        selectedCompany?.services.map((service) => {
                          const active = row.serviceIds.includes(service.id);

                          return (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => toggleService(index, service.id)}
                              className={`rounded-full px-3 py-1 text-sm transition ${
                                active
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200 hover:bg-gray-300"
                              }`}
                            >
                              {service.name}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <Button type="button" onClick={addRow} className="bg-sent-purple">
              {text["Request Services"].Add}
            </Button>
            <Button type="submit" className="bg-sent-purple">
              {text["Request Services"].Submit}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
