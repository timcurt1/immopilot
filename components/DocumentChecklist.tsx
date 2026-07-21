import type { RentalDocument } from "@/lib/types";

function tone(status: string) {
  if (status === "validé") return "green";
  if (status === "refusé") return "red";
  if (status === "à vérifier") return "amber";
  return "blue";
}

export function DocumentChecklist({ documents }: { documents: RentalDocument[] }) {
  if (documents.length === 0) {
    return <p className="emptyState">Aucun document requis pour ce dossier.</p>;
  }

  return (
    <div className="list">
      {documents.map((d) => (
        <div key={d.id} className="rowCard" style={{ gridTemplateColumns: "1fr auto" }}>
          <div>
            <b>{d.label}</b>
            <p style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: 12 }}>{d.file_name || "Aucun fichier"}</p>
          </div>
          <span className={`chip ${tone(d.status)}`}>{d.status}</span>
        </div>
      ))}
    </div>
  );
}
