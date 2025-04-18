"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";

import { signup } from "@/app/actions";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Loader2 } from "lucide-react";

import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// import { jwtDecode, JwtPayload } from "jwt-decode";

const formSchema = z
  .object({
    lastname: z.string().min(1).max(50),
    firstname: z.string().min(1).max(50),
    account: z.string().email(), //email
    password: z.string().min(6).max(12),
    checkedPassword: z.string().min(6).max(12),
  })
  .required();

const SignUpForm = (
//   {
//   setIsSignupSuccess,
// }: {
//   setIsSignupSuccess: React.Dispatch<React.SetStateAction<boolean>>;
// }
) => {
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastname: "",
      firstname: "",
      account: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { message } = await signup(
      `${data.firstname}${data.lastname}`,
      data.account,
      data.password
    );

    // if (success) {
    //   setIsSignupSuccess(true);
    //   router.push("/sign-in");
    // } else {
    alert(message);
    setIsLoading(false);
    form.reset();
    // }
  };

  return (
    <Form {...form}>
      <h1 className="text-3xl font-bold text-primary text-center mb-3">
        註冊會員
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="mb-3 flex-grow">
                <FormLabel>姓氏</FormLabel>
                <FormControl>
                  <Input placeholder="（ex: 王）" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="mb-3 flex-grow">
                <FormLabel>名字</FormLabel>
                <FormControl>
                  <Input placeholder="（ex: 小明）" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>註冊帳戶（電子信箱）</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="username"
                  placeholder="請使用電子信箱註冊（ex: test@example.com)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>註冊密碼</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="請設定6~12位英文字母大小寫和數字混合的密碼"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkedPassword"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>確認密碼</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="請再次輸入密碼"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center gap-2 mt-10">
          <Button
            type="submit"
            size="sm"
            className="w-1/4 min-w-[150px]"
            disabled={
              !form.formState.isValid ||
              form.getValues("password") !==
                form.getValues("checkedPassword") ||
              isLoading
            }
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "註冊中..." : "註冊"}
          </Button>
          <Button
            size="sm"
            asChild
            variant="outline"
            className="w-1/4 min-w-[150px]"
          >
            <Link href="/sign-in">以其他方式登入</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

const SignUp = () => {
  // const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  // if (isSignupSuccess) {
  //   setTimeout(() => {
  //     setIsSignupSuccess(false);
  //   }, 3000);
  // }
  return (
    <div className="h-full position-relative">
      <SignUpForm />
      {/* alert */}
      {/* {isSignupSuccess && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)]">
          <Alert className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-2xl"
              style={{ color: "#22c55e" }}
            />
            <AlertTitle className="text-green-500 font-semibold">
              註冊成功
            </AlertTitle>
            <AlertDescription>
              您已成功註冊會員,請登入以繼續使用Movemate
            </AlertDescription>
          </Alert>
        </div>
      )} */}
    </div>
  );
};

export default SignUp;
