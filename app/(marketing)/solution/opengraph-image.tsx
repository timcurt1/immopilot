import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Solution — ImmoPilot";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Solution", "Une couche d'intelligence au-dessus de l'activité de votre agence.");
}
