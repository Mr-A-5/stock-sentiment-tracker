import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { supabaseClient } from "@/providers/adminSupabaseClient";

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = await headers();

  const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET_DELETE!);

  let evt: { type: string; data: { id: string } };

  try {
    evt = svix.verify(payload, {
      "svix-id": headerPayload.get("svix-id")!,
      "svix-timestamp": headerPayload.get("svix-timestamp")!,
      "svix-signature": headerPayload.get("svix-signature")!,
    }) as { type: string; data: { id: string } };
  } catch (err) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (evt.type === "user.deleted") {
    const clerkUserId = evt.data.id;

    await supabaseClient.from("Users").delete().eq("id", clerkUserId);
  }

  return NextResponse.json({ received: true });
}
