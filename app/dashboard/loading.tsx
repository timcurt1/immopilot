export default function Loading() {
  return (
    <main className="appShell">
      <div className="layout">
        <div className="glass sidebar" style={{ opacity: 0.5 }} />
        <section className="main">
          <div className="grid4">
            <div className="card metric" style={{ opacity: 0.5 }} />
            <div className="card metric" style={{ opacity: 0.5 }} />
            <div className="card metric" style={{ opacity: 0.5 }} />
            <div className="card metric" style={{ opacity: 0.5 }} />
          </div>
          <div className="glass hero" style={{ opacity: 0.5, minHeight: 240 }} />
        </section>
      </div>
    </main>
  );
}
