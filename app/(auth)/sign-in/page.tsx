"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/public/movemate_logo.svg";
import GoogleLogo from "@/public/google_logo.svg";
import LineLogo from "@/public/line_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Loader2 } from "lucide-react";

// import { config } from "@/auth";

// import { signIn } from "next-auth/react";
// import { useSession } from "next-auth/react";
// import type {
//   GetServerSidePropsContext,
//   InferGetServerSidePropsType,
// } from "next";
// import { GET, POST } from "@/app/api/auth/[...nextauth]/route";

import { login } from "@/app/actions";
import { forgetPassword } from "@/app/actions";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "@/app/actions";

// type
import { UserAuth } from "@/types/user";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    account: z.string().email(),
    password: z.string().min(6).max(12),
  })
  .required();

const resetPasswordSchema = z
  .object({
    account: z.string().email(),
  })
  .required();

// const providers = config.providers;

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  // const { data: session, status } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: "",
      password: "",
    },
  });

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      account: "",
    },
  });

  // login
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const {
      success,
      message,
      data: token,
    } = await login(data.account, data.password);

    if (success) {
      setIsLoginSuccess(true);
      await setCookie("token", token);
      const decodedToken = jwtDecode<UserAuth>(token);
      console.log(decodedToken);
      await setCookie("user", JSON.stringify(decodedToken));
      if (!decodedToken.isFilledOutDoc) {
        router.push("/preferance-flow");
      } else {
        router.push("/");
      }
    } else {
      alert("登入失敗: " + message);
      setIsLoading(false);
    }
  };

  // 記錄一下是否為第一次登入 -> 都先導去首頁，後端回傳資料後再做判斷
  // 是：導向 /preferance-flow
  // 否：導向 /home

  const handleForgetPasswordPost = async () => {
    const { success, message } = await forgetPassword(
      resetPasswordForm.getValues("account")
    );
    console.log(message);
    if (success) {
      alert("已發送重設密碼信件至您的信箱, 請儘速修改密碼");
    } else {
      alert("發送重設密碼信件失敗, 請稍後再試");
    }
    resetPasswordForm.reset();
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
          defaultValue="signin"
          // value={tab}
          // onValueChange={(value) => {
          //   setTab(value);
          // }}
          className="w-full max-w-[600px]"
        >
          <Card className="w-full">
            <CardHeader className="py-3 px-0">
              <TabsList className="grid w-full grid-cols-2 p-0 bg-transparent">
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
                              className="border-t-0 border-r-0 border-l-0 border-b-1 border-b-primary rounded-none focus-visible:ring-0 bg-transparent"
                              type="email"
                              autoComplete="username"
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
                              className="border-t-0 border-r-0 border-l-0 border-b-1 border-b-primary rounded-none focus-visible:ring-0 bg-transparent"
                              type="password"
                              autoComplete="current-password"
                              placeholder="請輸入註冊時的密碼"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="link" size="sm">
                            <FontAwesomeIcon icon={faCircleQuestion} />
                            忘記密碼?
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>忘記密碼</AlertDialogTitle>
                            <AlertDialogDescription>
                              請輸入您註冊時的帳戶(電子信箱)，以重設密碼
                            </AlertDialogDescription>
                            <Form {...resetPasswordForm}>
                              <FormField
                                control={resetPasswordForm.control}
                                name="account"
                                render={({ field }) => (
                                  <FormItem className="mt-3">
                                    <FormLabel className="text-primary">
                                      帳戶
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        className="border-t-0 border-r-0 border-l-0 border-b-1 border-b-primary rounded-none focus-visible:ring-0 bg-transparent"
                                        type="email"
                                        placeholder="請輸入註冊時的電子信箱"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </Form>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction
                              disabled={!resetPasswordForm.getValues("account")}
                              onClick={handleForgetPasswordPost}
                            >
                              繼續
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button
                        variant="default"
                        size="sm"
                        className="w-1/3"
                        disabled={
                          !form.formState.isValid ||
                          !form.getValues("account") ||
                          !form.getValues("password") ||
                          isLoading
                        }
                        type="submit"
                      >
                        {isLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isLoading ? "登入中..." : "登入"}
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
          {/* <Button onClick={handleGoogleLogin}>
            <GoogleLogo width={30} height={30} className="w-6 h-6" />以 Google
            帳號登入
          </Button> */}
          {/* <Button onClick={handleFacebookLogin}>
            <FacebookLogo width={30} height={30} className="w-6 h-6" />以
            Facebook 帳號登入
          </Button> */}
          {/* <Button onClick={handleLineLogin}>
            <LineLogo width={30} height={30} className="w-6 h-6" />以 Line
            帳號登入
          </Button> */}
          <Button asChild>
            <Link href={`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/auth/google`}>
              <GoogleLogo width={30} height={30} className="w-6 h-6" />以 Google
              帳號登入
            </Link>
          </Button>
          <Button asChild>
            <Link href={`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/auth/line`}>
              <LineLogo width={30} height={30} className="w-6 h-6" />以 Line
              帳號登入
            </Link>
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
          unoptimized
          // fill={true}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {isLoginSuccess && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)]">
          <Alert className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-3xl"
              style={{ color: "#22c55e" }}
            />
            <AlertTitle className="text-lg text-green-500 font-semibold ml-3">
              登入成功
            </AlertTitle>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default SignIn;

// Note:
// In contrast to useSession, which will return a session object whether or not a user has logged in (whether or not cookies are present), getServerSession only returns a session object when a user has logged in (only when authenticated cookies are present), otherwise, it returns null.
// data: This can be three values: Session / undefined / null.
//  - when the session hasn't been fetched yet, data will be undefined
//  - in case it failed to retrieve the session, data will be null
//  - in case of success, data will be Session.
// status: enum mapping to three possible session states: "loading" | "authenticated" | "unauthenticated"
