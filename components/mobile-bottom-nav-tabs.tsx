"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  //   DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import FriendListItem from "@/components/friend-list-item";
import CommunityListItem from "@/components/community-list-item";

const MobileBottomNavTabs = () => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="flex gap-2 fixed p-2 bottom-0 left-0 right-0 bg-background md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="w-1/2 rounded-sm"
            variant="secondary"
            onClick={() => setActiveTab("friends")}
          >
            好友
          </Button>
        </DrawerTrigger>
        <DrawerTrigger asChild>
          <Button
            className="w-1/2 rounded-sm"
            variant="secondary"
            onClick={() => setActiveTab("communities")}
          >
            你的社群
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                {activeTab === "friends" ? "好友" : "你的社群"}
              </DrawerTitle>
            </DrawerHeader>
            {activeTab === "friends" ? (
              <div className="flex flex-col gap-3 p-4 pt-0 h-[40vh] overflow-scroll">
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
              </div>
            ) : (
              <div className="flex flex-wrap p-4 pt-0">
                <CommunityListItem
                  isMobileScreen
                  name={"社群 ABCDEFG"}
                  description="社群描述..."
                  avatarSrc={
                    "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                  }
                  membersNum={100}
                />
                <CommunityListItem
                  isMobileScreen
                  name={"社群 ABCDEFG"}
                  description="社群描述..."
                  avatarSrc={
                    "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                  }
                  membersNum={66}
                />
                <CommunityListItem
                  isMobileScreen
                  name={"社群 ABCDEFG"}
                  description="社群描述..."
                  avatarSrc={
                    "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                  }
                  membersNum={4}
                />
                <CommunityListItem
                  isMobileScreen
                  name={"社群 ABCDEFG"}
                  description="社群描述..."
                  avatarSrc={
                    "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                  }
                  membersNum={58}
                />
                <CommunityListItem
                  isMobileScreen
                  name={"社群 ABCDEFG"}
                  description="社群描述..."
                  avatarSrc={
                    "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                  }
                  membersNum={72}
                />
              </div>
            )}

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">關閉</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileBottomNavTabs;
