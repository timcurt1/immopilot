import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = "Ressources — ImmoPilot";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Ressources", "Guides et articles pour les professionnels de l'immobilier.");
}
