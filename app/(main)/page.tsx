// "use client";

import React from "react";
import { redirect } from 'next/navigation'
// import { useSearchParams } from "next/navigation";


export default function Home() {
  // const searchParams = useSearchParams();
  // const code = searchParams.get("code");

  // console.log(code);
  // const token = localStorage.getItem("token");

  // if (!token) {
  //   redirect("/sign-in")
  // }

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      test homepage
    </div>
  );
}
