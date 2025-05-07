"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { resetPassword } from "@/app/actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    // account: z.string().email(),
    password: z.string().min(6).max(12),
    confirmPassword: z.string().min(6).max(12),
  })
  .required();

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // sent to backend
    console.log(data);
    const { success, message } = await resetPassword(
      data.password,
      token || ""
    );
    if (success) {
      alert("密碼重設成功");
      router.push("/sign-in");
    } else {
      alert("密碼重設失敗: " + message);
    }
  };

  return (
    <Form {...form}>
      <h1 className="text-3xl font-bold text-primary text-center mb-3">
        重設密碼
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>設定新密碼</FormLabel>
              <FormControl>
                <Input
                  type="password"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>再次確認新密碼</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="請再次輸入密碼"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center gap-2 mt-10">
          <Button type="submit" size="sm" className="w-1/4 min-w-[150px]">
            確認
          </Button>
        </div>
      </form>
    </Form>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-full position-relative">
        <ResetPasswordForm />
      </div>
    </Suspense>
  );
};

export default ResetPassword;
