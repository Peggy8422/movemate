export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg-gradient-to-br from-neutral-50 to-neutral-800 flex min-h-screen flex-col items-center justify-center">{children}</main>;
}
