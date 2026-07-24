import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Sécurité — ImmoPilot";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Sécurité", "Vos données restent sous votre contrôle.");
}
