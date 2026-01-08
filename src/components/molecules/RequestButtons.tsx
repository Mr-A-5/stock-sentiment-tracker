"use client";

import Button from "../atoms/Button";

type ButtonsProps = {
  user_id: string;
  companies: Record<string, string[]>;
};

export default function RequestButtons({ companies, user_id }: ButtonsProps) {
  const handleClick = async () => {
    try {
      const payload = {
        user_id,
        companies,
      };
      const res = await fetch("/api/acceptRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      console.log("Error sending data");
    }
  };

  return (
    <>
      <Button color="green" size="base" onClick={handleClick}>
        Accept
      </Button>
      <Button color="red" size="base">
        Decline
      </Button>
    </>
  );
}
