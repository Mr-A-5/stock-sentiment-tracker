"use client";

import { Alert, Button, Label, Textarea, TextInput } from "flowbite-react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const locales: Record<string, typeof en> = {
  en,
  es,
};

type Props = {
  locale: string;
};

export default function ContactForm({ locale }: Props) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  if (!isLoaded) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      description: formData.get("description"),
    };

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

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

  const text = locales[locale] ?? en;

  return (
    <div className="flex flex-col bg-white rounded-b-xl items-center h-fit px-4 py-10 w-full lg:px-0 lg:justify-center lg:py-0 lg:min-h-screen lg:h-fit">
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
          className=" bg-sent-gray rounded-xl h-fit
      w-full
      lg:max-w-6/10 lg:pt-5"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
            <div className="flex w-full justify-center pb-3 border-b-4">
              <Label className="w-fit text-3xl font-extrabold" color="gray">
                {text.ContactUS.Title}
              </Label>
            </div>
            <div
              className="flex w-full gap-7
          flex-col          
          lg:flex-row"
            >
              <div className="w-full lg:w-1/2">
                <Label className="text-xl p-1 px-3" color="gray">
                  {text.ContactUS.Name}
                </Label>
                <TextInput
                  name="name"
                  defaultValue={user?.fullName ?? ""}
                  className="m-1"
                  color="info"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <Label className="text-xl p-1 px-3" color="gray">
                  {text.ContactUS.Email}
                </Label>
                <TextInput
                  name="email"
                  defaultValue={user?.emailAddresses[0]?.emailAddress ?? ""}
                  className="m-1 "
                  color="info"
                />
              </div>
            </div>
            <div className="flex flex-row w-full gap-7 ">
              <div className="w-full lg:max-w-1/2">
                <Label className="text-xl p-1 px-3" color="gray">
                  {text.ContactUS["Phone Number"]}
                </Label>
                <TextInput name="phone" className="m-1 pr-3" color="info" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Label className="text-xl p-1 px-3" color="gray">
                {text.ContactUS.Description}
              </Label>
              <Textarea name="description" className="m-1 " color="info" />
            </div>
            <Button type="submit" className="bg-sent-purple cursor-pointer">
              {text.ContactUS.Submit}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
