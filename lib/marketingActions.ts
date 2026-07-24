"use server";

import { redirect } from "next/navigation";
import { sendEmail } from "@/lib/email";

const SALES_EMAIL = process.env.SALES_EMAIL || "demo@immopilot.example";

function str(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function submitContact(formData: FormData) {
  const firstName = str(formData, "firstName");
  const lastName = str(formData, "lastName");
  const email = str(formData, "email");
  const message = str(formData, "message");

  if (!firstName || !lastName || !email || !message) {
    redirect("/contact?error=1");
  }

  await sendEmail({
    to: SALES_EMAIL,
    subject: `Nouveau message de contact — ${firstName} ${lastName}`,
    html: `<p><b>${firstName} ${lastName}</b> (${email})</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
  });

  redirect("/contact/merci");
}

export async function submitDemoRequest(formData: FormData) {
  const firstName = str(formData, "firstName");
  const lastName = str(formData, "lastName");
  const email = str(formData, "email");
  const phone = str(formData, "phone");
  const role = str(formData, "role");
  const company = str(formData, "company");
  const agencyCount = str(formData, "agencyCount");
  const teamSize = str(formData, "teamSize");
  const activity = str(formData, "activity");
  const software = str(formData, "software");
  const challenge = str(formData, "challenge");
  const timeline = str(formData, "timeline");
  const consent = formData.get("consent");

  if (!firstName || !lastName || !email || !company || !consent) {
    redirect("/demande-demo?error=1");
  }

  const rows: [string, string][] = [
    ["Nom", `${firstName} ${lastName}`],
    ["E-mail", email],
    ["Téléphone", phone || "—"],
    ["Fonction", role || "—"],
    ["Entreprise", company],
    ["Nombre d'agences", agencyCount || "—"],
    ["Nombre de collaborateurs", teamSize || "—"],
    ["Activité principale", activity || "—"],
    ["Logiciel métier actuel", software || "—"],
    ["Problématique principale", challenge || "—"],
    ["Délai envisagé", timeline || "—"],
  ];

  await sendEmail({
    to: SALES_EMAIL,
    subject: `Nouvelle demande de démonstration — ${company}`,
    html: `<table>${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${v}</td></tr>`).join("")}</table>`,
  });

  redirect("/demande-demo/merci");
}
