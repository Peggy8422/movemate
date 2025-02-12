import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import PreferanceFlowForm from "@/components/preferance-flow-form";
const PreferanceFlow = () => {
  const token = cookies().get("token");
  if (!token) {
    redirect("/sign-in");
  } else {
    console.log(token);
  }

  return <PreferanceFlowForm />;
};

export default PreferanceFlow;
