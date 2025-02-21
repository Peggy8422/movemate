"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SignUpVerifyPageContent = () => {
  const [verifiedResultMsg, setVerifiedResultMsg] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  useEffect(() => {
    if (status === "success") {
      if (message === "email_verified") {
        setVerifiedResultMsg("信箱驗證成功，請重新登入");
      }
    } else {
      setVerifiedResultMsg("信箱驗證失敗，請重新註冊或以其他方式登入");
    }
  }, [router, status, message]);

  return (
    <div className="flex items-center justify-center gap-4">
      <Card className="w-[400px]">
        <CardContent className="pt-6">
          <CardDescription className="text-center text-md text-neutral-700">
            {verifiedResultMsg}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            回到登入頁
          </Button>
        </CardFooter>
      </Card>
      {/* <p>{verifiedResultMsg}</p> */}
    </div>
  );
};
const SignUpVerify = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpVerifyPageContent></SignUpVerifyPageContent>
    </Suspense>
  );
};

export default SignUpVerify;
