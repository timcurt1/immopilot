import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY || "";
const fromAddress = process.env.RESEND_FROM || "ImmoPilot <notifications@immopilot.example>";

export const resendConfigured = Boolean(apiKey);

const resend = resendConfigured ? new Resend(apiKey) : null;

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!resendConfigured || !resend) {
    console.log(`[email désactivé] à ${to} : ${subject}`);
    return { ok: true, local: true };
  }
  const { error } = await resend.emails.send({ from: fromAddress, to, subject, html });
  return { ok: !error, error: error?.message };
}
