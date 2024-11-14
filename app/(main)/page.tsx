"use client";

import React from "react";
import { useSearchParams } from "next/navigation";


export default function Home() {
  const searchParams = useSearchParams();
  // if use Line login
  const code = searchParams.get("code");

  console.log(code);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          test homepage
      </main>
    </div>
  );
}
