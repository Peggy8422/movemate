import React from "react";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default function Home() {
  const token = cookies().get("token");
  if (!token) {
    redirect("/sign-in");
  } else {
    console.log(token);
  }


  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 md:w-[calc(80%-50px)]">
      test homepage
    </div>
  );
}
