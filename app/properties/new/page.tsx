import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { NewPropertyForm } from "@/components/NewPropertyForm";

export default function NewPropertyPage() {
  return (
    <main className="appShell">
      <Topbar title="Ajouter un bien" subtitle="Renseigne les informations principales du logement." />
      <div className="layout">
        <Sidebar />
        <section className="main">
          <Link className="btn ghost" href="/properties" style={{ marginBottom: 14, display: "inline-flex", width: "max-content" }}>
            ← Retour aux biens
          </Link>
          <NewPropertyForm />
        </section>
      </div>
    </main>
  );
}
