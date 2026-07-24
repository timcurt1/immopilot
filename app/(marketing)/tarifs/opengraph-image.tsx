import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Tarifs — ImmoPilot";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Tarifs", "Une offre adaptée à la taille et aux besoins de votre agence.");
}
