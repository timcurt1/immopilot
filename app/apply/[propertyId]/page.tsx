import { ApplyForm } from "@/components/ApplyForm";
import { getPublicProperty } from "@/lib/data";

export default async function ApplyPage({ params }: { params: { propertyId: string } }) {
  const property = await getPublicProperty(params.propertyId);

  if (!property) {
    return (
      <main className="appShell" style={{ display: "grid", placeItems: "center" }}>
        <section className="glass hero" style={{ maxWidth: 560 }}>
          <span className="kicker">Candidature</span>
          <h2>Ce bien n’est plus disponible.</h2>
          <p>Le lien de candidature n’est plus valide, ou le logement a déjà été loué.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="appShell" style={{ display: "grid", placeItems: "center" }}>
      <section className="glass" style={{ width: "min(980px,100%)", display: "grid", gridTemplateColumns: "1fr 420px", gap: 18, padding: 18 }}>
        <div className="hero">
          <span className="kicker">Candidature locative</span>
          <h2>
            {property.title}
            <br />
            <span className="grad">{property.rent} € CC</span>
          </h2>
          <p>
            {property.address ? `${property.address}, ` : ""}
            {property.city}. Complète ce formulaire pour transmettre ton dossier à l’agence.
          </p>
        </div>
        <ApplyForm propertyId={property.id} />
      </section>
    </main>
  );
}
