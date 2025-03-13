import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommunityListItem from "@/components/community-list-item";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pt-28 pb-20 gap-16 md:w-[calc(80%-50px)]">
      <Card className="">
        <CardHeader>
          <CardTitle>熱門社群</CardTitle>
          <CardDescription>社群成員人數 150+</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <div className="flex-basis-1/5">
            <CommunityListItem
              isFullWidth={true}
              isMobileScreen={false}
              name={"社群 ABCDEFG"}
              description="社群描述..."
              avatarSrc={
                "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              }
              membersNum={100}
            />
          </div>
          <div className="flex-basis-1/5">
            <CommunityListItem
              isFullWidth={true}
              isMobileScreen={false}
              name={"社群 ABCDEFG"}
              description="社群描述..."
              avatarSrc={
                "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              }
              membersNum={100}
            />
          </div>
          <div className="flex-basis-1/5">
            <CommunityListItem
              isFullWidth={true}
              isMobileScreen={false}
              name={"社群 ABCDEFG"}
              description="社群描述..."
              avatarSrc={
                "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              }
              membersNum={100}
            />
          </div>
          <div className="flex-basis-1/5">
            <CommunityListItem
              isFullWidth={true}
              isMobileScreen={false}
              name={"社群 ABCDEFG"}
              description="社群描述..."
              avatarSrc={
                "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              }
              membersNum={100}
            />
          </div>
          <div className="flex-basis-1/5">
            <CommunityListItem
              isFullWidth={true}
              isMobileScreen={false}
              name={"社群 ABCDEFG"}
              description="社群描述..."
              avatarSrc={
                "https://images.unsplash.com/photo-1499714608240-22fc6c93be2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              }
              membersNum={100}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
