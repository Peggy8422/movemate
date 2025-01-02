import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/next-theme-provider";
import NavHeader from "@/components/nav-header";
import MobileBottomNavTabs from "@/components/mobile-bottom-nav-tabs";
import FriendListItem from "@/components/friend-list-item";
import CommunityListItem from "@/components/community-list-item";
import {
  SidebarProvider,
  // SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
import BrandLogo from "@/public/movemate_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faComments,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <Sidebar collapsible="icon">
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
            <main className="w-full bg-gradient-to-b from-neutral-50 dark:from-neutral-900 to-secondary relative">
              {/* nav-header */}
              <NavHeader />
              {/* <SidebarTrigger /> */}
              <div className="w-full md:w-[calc(80%-50px)]">{children}</div>
              <div className="hidden md:block md:w-1/5 h-screen fixed right-0 top-0 bg-background p-4 pt-[6rem]">
                <div className="h-1/2">
                  <h3 className="text-primary font-semibold mb-3">好友</h3>
                  <div className="flex flex-col gap-3 pb-2 h-[calc(100%-1.5rem)] overflow-scroll">
                    <FriendListItem
                      name="John Doe"
                      status="跑步"
                      avatarSrc="https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      isOnline={true}
                    />
                    <FriendListItem
                      name="Jane Doe"
                      status="瑜珈"
                      avatarSrc="https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      isOnline={false}
                    />
                    <FriendListItem
                      name="John Doe"
                      status="游泳"
                      avatarSrc="https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      isOnline={true}
                    />
                    <FriendListItem
                      name="John Doe"
                      status="游泳"
                      avatarSrc="https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      isOnline={true}
                    />
                    <FriendListItem
                      name="John Doe"
                      status="游泳"
                      avatarSrc="https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      isOnline={true}
                    />
                    <FriendListItem
                      name="John Doe"
                      status="游泳"
                      avatarSrc="https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      isOnline={true}
                    />
                  </div>
                </div>
                <div className="h-[calc(50%-35px)]">
                  <Separator className="my-3" />
                  <h3 className="text-primary font-semibold mb-3">你的社群</h3>
                  <div className="flex flex-wrap pb-2 h-[calc(100%-2rem)] overflow-scroll">
                    <CommunityListItem
                      isMobileScreen={false}
                      name={"社群 ABCDEFG"}
                      description="社群描述..."
                      avatarSrc={
                        "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      }
                      membersNum={100}
                    />
                    <CommunityListItem
                      isMobileScreen={false}
                      name={"社群 ABCDEFG"}
                      description="社群描述..."
                      avatarSrc={
                        "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      }
                      membersNum={66}
                    />
                    <CommunityListItem
                      isMobileScreen={false}
                      name={"社群 ABCDEFG"}
                      description="社群描述..."
                      avatarSrc={
                        "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      }
                      membersNum={4}
                    />
                    <CommunityListItem
                      isMobileScreen={false}
                      name={"社群 ABCDEFG"}
                      description="社群描述..."
                      avatarSrc={
                        "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      }
                      membersNum={58}
                    />
                    <CommunityListItem
                      isMobileScreen={false}
                      name={"社群 ABCDEFG"}
                      description="社群描述..."
                      avatarSrc={
                        "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      }
                      membersNum={72}
                    />
                    <CommunityListItem
                      isMobileScreen={false}
                      name={"社群 ABCDEFG"}
                      description="社群描述..."
                      avatarSrc={
                        "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      }
                      membersNum={10}
                    />
                    <CommunityListItem
                      isMobileScreen={false}
                      name={"社群 ABCDEFG"}
                      description="社群描述..."
                      avatarSrc={
                        "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      }
                      membersNum={290}
                    />
                    <CommunityListItem
                      isMobileScreen
                      name={"社群 ABCDEFG"}
                      description="社群描述..."
                      avatarSrc={
                        "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      }
                      membersNum={11}
                    />
                  </div>
                </div>
                <div className="h-[35px] pl-6 pr-3 bg-background absolute bottom-0 left-0 right-0 flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  <h6> 聊天室 </h6>
                  <span className="active_room_num inline-block p-1 px-2 rounded-sm bg-neutral-300 dark:bg-neutral-500 text-neutral-800 dark:text-neutral-200 font-medium text-xs">2</span>
                </div>
              </div>
              {/* small screen (mobile) */}
              <MobileBottomNavTabs />
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
