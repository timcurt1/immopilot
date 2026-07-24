import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

const SALES_EMAIL = process.env.SALES_EMAIL || "demo@immopilot.example";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const source = typeof body?.source === "string" ? body.source : "inconnue";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "E-mail invalide." }, { status: 400 });
  }

  await sendEmail({
    to: SALES_EMAIL,
    subject: `Nouvelle demande de présentation — ${email}`,
    html: `<p>Adresse : <b>${email}</b></p><p>Source : ${source}</p>`,
  });

  return NextResponse.json({ ok: true });
}
