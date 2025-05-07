import React from "react";

export default function LoginRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gradient-to-br from-neutral-50 to-neutral-800 flex h-screen justify-center items-center">
      {children}
    </main>
  );
}
