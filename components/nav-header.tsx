"use client";

import React, { useEffect, useState } from "react";
import BrandLogo from "@/public/movemate_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";

import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { getCookie, deleteCookie } from "@/app/actions";

interface User {
  id?: string;
  name: string;
  email: string;
  googleId?: string;
  facebookId?: string;
  lineId?: string;
  coverPhoto: string;
  isFilledOutDoc: boolean;
  iat: number;
  exp: number;
}


const NavHeader = () => {
  
  
  const [user, setUser] = useState<User | null>(null);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getCookie("user");
      if (userData) {
        setUser(JSON.parse(userData.value));
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="brand-header w-full pr-8 pl-3 py-4 flex items-center justify-between absolute top-0 left-0 shadow-md bg-neutral-100 dark:bg-neutral-900 z-40">
      <div className="flex items-center">
        {pathname !== "/preferance-flow" && (
          <SidebarTrigger className="text-primary" />
        )}
        {pathname !== "/preferance-flow" && (
          <div className="h-[30px]">
            <Separator orientation="vertical" className="mx-3" />
          </div>
        )}
        <BrandLogo
          fill="hsl(var(--primary))"
          width={50}
          height={50}
          className="h-[30px] sm:h-[50px] mr-2 sm:mr-4"
        />
        <h1 className="font-baloo text-xl sm:text-3xl font-bold text-primary">
          MoveMate
        </h1>
      </div>
      {/* avatar + dropdown menu */}
      <div className="flex gap-2">
        <Button variant="outline" size="icon" className="text-primary">
          <FontAwesomeIcon icon={faBell} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative">
              <Avatar className="cursor-pointer border-2 border-secondary">
                {/* fetch avatar */}
                <AvatarImage src={user?.coverPhoto || "/default_user_avatar_1.png"} />
                {/* Fallback: username */}
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
              <div className="absolute right-0 bottom-0 h-2 w-2 bg-green-500 rounded-full"></div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>我的帳戶</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled={pathname === "/preferance-flow"}>
                個人頁面設定
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await deleteCookie("token");
                  await deleteCookie("user");
                  router.push("/sign-in");
                }}
              >
                登出
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>主題色</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme}
                  >
                    <DropdownMenuRadioItem value="light">
                      <FontAwesomeIcon icon={faSun} className="w-6" />
                      亮色
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <FontAwesomeIcon icon={faMoon} className="w-6" />
                      暗色
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavHeader;
