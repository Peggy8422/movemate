export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex h-screen flex-col md:w-[calc(80%-50px)]">
        {children}
      </div>
    );
  }