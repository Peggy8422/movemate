"use client";

import React from "react";
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
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    lastname: z.string().min(1).max(50),
    firstname: z.string().email(),
    account: z.string().min(1).max(50), //email
    password: z.string().min(6).max(12),
    checkedPassword: z.string().min(6).max(12),
  })
  .required();

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastname: "",
      firstname: "",
      account: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // sent to backend
    console.log(data);
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
                {/* <FormDescription>
              使用者姓氏必須介於 1 到 50 個字之間
            </FormDescription> */}
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
                {/* <FormDescription>
              使用者名字必須介於 1 到 50 個字之間
            </FormDescription> */}
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
                  placeholder="請使用電子信箱註冊（ex: test@example.com)"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
              使用者姓氏必須介於 1 到 50 個字之間
            </FormDescription> */}
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
                  placeholder="請設定6~12位英文字母大小寫和數字混合的密碼"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
              使用者姓氏必須介於 1 到 50 個字之間
            </FormDescription> */}
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
                  placeholder="請再次輸入密碼"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
              使用者姓氏必須介於 1 到 50 個字之間
            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center gap-2 mt-10">
          <Button type="submit" size="sm" className="w-1/4 min-w-[150px]">
            註冊
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
  return (
    <div className="h-full position-relative">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
