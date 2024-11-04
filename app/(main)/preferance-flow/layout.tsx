export default function PreferanceFlowLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main className="flex h-screen flex-col">
        {children}
      </main>
    );
  }
  