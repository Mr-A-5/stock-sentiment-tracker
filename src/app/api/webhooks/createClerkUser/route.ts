import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { supabaseClient } from "@/providers/adminSupabaseClient";

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = await headers();

  const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET_CREATE!);

  let evt: {
    type: string;
    data: { id: string; first_name: string; last_name: string; email: string };
  };

  try {
    evt = svix.verify(payload, {
      "svix-id": headerPayload.get("svix-id")!,
      "svix-timestamp": headerPayload.get("svix-timestamp")!,
      "svix-signature": headerPayload.get("svix-signature")!,
    }) as typeof evt;
  } catch (err) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (evt.type === "user.created") {
    const clerkUserId = evt.data.id;
    const name = evt.data.first_name + " " + evt.data.last_name;
    const email = evt.data.email;

    await supabaseClient.from("Users").upsert({
      id: clerkUserId,
      email,
      name,
    });
  }

  return NextResponse.json({ received: true });
}
