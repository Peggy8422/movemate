"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";


const FriendListItem = ({
  name,
  status,
  avatarSrc,
  isOnline,
}: {
  name: string;
  status: string;
  avatarSrc: string;
  isOnline: boolean;
}) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <Avatar className="h-14 w-14">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div
          className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full",
            isOnline ? "bg-green-500" : "bg-gray-500"
          )}
        ></div>
      </div>
      <div>
        <div className="text-md md:text-lg font-bold text-neutral-800 dark:text-neutral-200">
          {name}
        </div>
        <div className="text-sm text-primary">
          <FontAwesomeIcon icon={faAnglesRight} className="mr-1" />
          正在: {status}...
        </div>
      </div>
    </div>
  );
};

export default FriendListItem;
