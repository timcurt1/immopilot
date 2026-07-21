export default function Loading() {
  return (
    <main className="appShell">
      <div className="layout">
        <div className="glass sidebar" style={{ opacity: 0.5 }} />
        <section className="main">
          <div className="glass hero" style={{ opacity: 0.5, minHeight: 160 }} />
          <div className="grid3">
            <div className="card" style={{ opacity: 0.5, minHeight: 180 }} />
            <div className="card" style={{ opacity: 0.5, minHeight: 180 }} />
            <div className="card" style={{ opacity: 0.5, minHeight: 180 }} />
          </div>
        </section>
      </div>
    </main>
  );
}
