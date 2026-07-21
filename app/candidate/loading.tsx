export default function Loading() {
  return (
    <main className="appShell">
      <div className="layout">
        <div className="glass sidebar" style={{ opacity: 0.5 }} />
        <section className="main">
          <div className="grid2">
            <div className="glass hero" style={{ opacity: 0.5, minHeight: 260 }} />
            <div className="glass" style={{ opacity: 0.5, minHeight: 260 }} />
          </div>
        </section>
      </div>
    </main>
  );
}
