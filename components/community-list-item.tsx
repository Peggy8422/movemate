"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

const CommunityListItem = ({
  isMobileScreen = false,
  name,
  description,
  avatarSrc,
  membersNum,
}: {
  isMobileScreen: boolean;
  name: string;
  description: string;
  avatarSrc: string;
  membersNum: number;
}) => {
  return (
    <div
      className={cn(
        "text-center lg:w-1/2 p-2",
        isMobileScreen ? "w-1/2" : "w-full"
      )}
    >
      <HoverCard>
        <HoverCardTrigger>
          <Avatar className="cursor-pointer h-24 w-24 lg:h-20 lg:w-20 mx-auto border-2 border-primary">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm md:text-md font-bold text-neutral-800 mt-2 max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
            {name}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="text-left">
          <h2 className="font-bold text-primary mb-2">{name}</h2>
          <p className="text-sm mb-2">{description}</p>
          <p className="text-sm">成員人數: {membersNum}</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default CommunityListItem;
