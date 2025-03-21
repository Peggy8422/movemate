"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faComments,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import BrandLogo from "@/public/movemate_logo.svg";

const sidebarItems = [
  {
    label: "首頁",
    href: "/",
    icon: faHome,
  },
  {
    label: "個人資料",
    href: "/profile",
    icon: faUser,
  },
  {
    label: "熱門社群",
    href: "/hot-community",
    icon: faComments,
  },
  {
    label: "我的收藏",
    href: "/my-collection",
    icon: faHeart,
  },
];

const SidebarComp = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/preferance-flow" ? (
        <Sidebar collapsible="icon" className="z-50">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="font-baloo font-bold">
                <BrandLogo
                  fill="hsl(var(--primary))"
                  width={30}
                  height={30}
                  className="mr-2"
                />
                MoveMate
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild>
                        <a href={item.href}>
                          {/* <item.icon /> */}
                          <FontAwesomeIcon icon={item.icon} />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      ) : (
        <></>
      )}
    </>
  );
};

export default SidebarComp;
