"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/public/movemate_logo.svg";
import GoogleLogo from "@/public/google_logo.svg";
import FacebookLogo from "@/public/facebook_logo.svg";
import LineLogo from "@/public/line_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

// shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    account: z.string().email(),
    password: z.string().min(6).max(12),
  })
  .required();

const SignIn = () => {
  const [tab, setTab] = useState("signin");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // sent to backend
    console.log(data);
  };

  return (
    <div className="flex h-full position-relative max-w-[1440px] mx-auto">
      <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start justify-center px-10 h-full">
        <div className="flex items-center">
          <BrandLogo
            fill="#001f54"
            width={60}
            height={60}
            className="mr-4 w-12 sm:w-20 md:w-24 sm:mb-3"
          />
          <h1 className="font-baloo text-4xl sm:text-5xl md:text-6xl font-bold text-primary">
            MoveMate
          </h1>
        </div>
        <p className="font-notoSans font-normal mb-3 pl-1 text-s md:text-base text-center sm:text-left tracking-widest">
          找尋志同道合的運動夥伴，快速搜索附近最適當的運動場所，享受健身樂趣、營造健康的生活
        </p>
        {/* card with tabs for sign in */}
        <Tabs
          value={tab}
          onValueChange={(value) => {
            setTab(value);
          }}
          className="w-full max-w-[600px]"
        >
          <Card className="w-full">
            <CardHeader className="py-3 px-0">
              <TabsList className="grid w-full grid-cols-2 p-0">
                <TabsTrigger
                  value="signin"
                  className="rounded-none text-secondary text-base border-b-2 border-b-secondary data-[state=active]:text-primary data-[state=active]:border-b-primary"
                >
                  登入
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-none text-secondary text-base border-b-2 border-b-secondary data-[state=active]:text-primary data-[state=active]:border-b-primary"
                >
                  註冊
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="h-[33vh]">
              <TabsContent value="signin">
                {/* <CardTitle className="mb-2">Sign in</CardTitle> */}
                <CardDescription className="text-center tracking-wider">
                  歡迎回來! 請先登入以繼續使用
                </CardDescription>
                {/* Sign in form */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 mb-3 px-6"
                  >
                    <FormField
                      control={form.control}
                      name="account"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary">帳戶</FormLabel>
                          <FormControl>
                            <Input
                              className="border-b-1 border-b-primary rounded-none focus-visible:ring-0"
                              type="email"
                              placeholder="請輸入註冊時的帳戶(電子信箱)"
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
                        <FormItem>
                          <FormLabel className="text-primary">密碼</FormLabel>
                          <FormControl>
                            <Input
                              className="border-b-1 border-b-primary rounded-none focus-visible:ring-0"
                              type="password"
                              placeholder="請輸入註冊時的密碼"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="link" size="sm">
                        <FontAwesomeIcon icon={faCircleQuestion} />
                        忘記密碼?
                      </Button>
                      <Button variant="default" size="sm" className="w-1/3">
                        登入
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="signup">
                <CardDescription className="text-center tracking-wider pt-6">
                  現在就加入我們!
                  <br />
                  在這裡與你的健身夥伴們分享運動經驗
                </CardDescription>
                <div className="text-center mt-6">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full md:w-1/2"
                    asChild
                  >
                    <Link href="/sign-up">建立新帳戶</Link>
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
        {/* buttons for social media logins */}
        <div className="flex flex-col gap-4 mt-6 w-full md:w-1/2 min-w-[250px]">
          <Button>
            <GoogleLogo width={30} height={30} className="w-6 h-6" />以 Google
            帳號登入
          </Button>
          <Button>
            <FacebookLogo width={30} height={30} className="w-6 h-6" />以
            Facebook 帳號登入
          </Button>
          <Button>
            <LineLogo width={30} height={30} className="w-6 h-6" />以 Line
            帳號登入
          </Button>
        </div>
      </div>
      <div className="sm:w-1/2 flex justify-end position-relative">
        <Image
          className="object-cover hidden sm:block"
          src="/movemate_cover_img.png"
          alt="movemate cover"
          width={500}
          height={600}
          priority
          // fill={true}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default SignIn;
