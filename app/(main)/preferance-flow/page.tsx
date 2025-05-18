import React from "react";

import PreferanceFlowForm from "@/components/preferance-flow-form";
import { getCookie } from "@/app/actions";

const getFlowQuestions = async () => {
  const token = await getCookie("token");
  const response = await fetch(
    `${process.env.DEV_BASE_URL}/flow/getFlow`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  const data = await response.json();
  return {
    questions: data.data,
  };
};

const PreferanceFlow = async () => {
  const { questions } = await getFlowQuestions();

  return <PreferanceFlowForm questions={questions} />;
};

export default PreferanceFlow;
