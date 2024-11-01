import BrandLogo from "@/public/movemate_logo.svg";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gradient-to-b from-neutral-50 to-secondary h-screen">
      <div className="brand-header w-full px-8 py-4 flex items-center gap-2 position-fixed top-0 left-0">
        <BrandLogo fill="#001f54" width={50} height={50} className="mr-4" />
        <h1 className="font-baloo text-3xl font-bold text-primary">MoveMate</h1>
      </div>
      <div className="w-1/2 mx-auto mt-20 max-w-[600px]">{children}</div>
    </main>
  );
}
