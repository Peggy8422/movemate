"use client";

import React from "react";
import { usePathname } from "next/navigation";

import MobileBottomNavTabs from "@/components/mobile-bottom-nav-tabs";
import FriendListItem from "@/components/friend-list-item";
import CommunityListItem from "@/components/community-list-item";
import { Separator } from "@/components/ui/separator";

const SocialListComp = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/preferance-flow" ? (
        <>
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
                  isMobileScreen={false}
                  name={"社群 ABCDEFG"}
                  description="社群描述..."
                  avatarSrc={
                    "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                  }
                  membersNum={11}
                />
              </div>
            </div>
            <div className="h-[35px] pl-6 pr-3 bg-background absolute bottom-0 left-0 right-0 flex items-center gap-3 cursor-pointer">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <h6> 聊天室 </h6>
              <span className="active_room_num inline-block p-1 px-2 rounded-sm bg-neutral-300 dark:bg-neutral-500 text-neutral-800 dark:text-neutral-200 font-medium text-xs">
                2
              </span>
            </div>
          </div>
          {/* small screen (mobile) */}
          <MobileBottomNavTabs />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SocialListComp;
