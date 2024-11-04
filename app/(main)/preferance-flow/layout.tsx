export default function PreferanceFlowLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main className="bg-gradient-to-br from-neutral-50 to-neutral-800 flex h-screen flex-col">
        {children}
      </main>
    );
  }
  