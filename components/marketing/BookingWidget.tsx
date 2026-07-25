const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

export function BookingWidget() {
  if (!CALENDLY_URL) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
        <p className="text-sm text-muted">
          La prise de rendez-vous en ligne sera bientôt disponible ici. En attendant, laissez-nous vos coordonnées
          ci-dessous.
        </p>
      </div>
    );
  }

  const embedUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=0b1220&primary_color=1d43e6`;

  return (
    <div className="rounded-2xl border border-line bg-white overflow-hidden">
      <iframe
        src={embedUrl}
        title="Réserver une démonstration ImmoPilot"
        loading="lazy"
        className="w-full"
        style={{ height: 700, border: 0 }}
      />
    </div>
  );
}
