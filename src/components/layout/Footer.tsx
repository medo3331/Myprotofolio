export function Footer({ name }: { name: string }) {
  return (
    <footer className="py-10 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 text-center font-mono text-xs text-muted">
        صُنع بـ <span className="text-accent">♥</span> بواسطة{" "}
        <span className="text-accent">{name}</span> — © 2026
      </div>
    </footer>
  );
}
