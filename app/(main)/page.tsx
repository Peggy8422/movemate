import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CommunityListItem from "@/components/community-list-item";
import RankingCardItem from "@/components/ranking-card-item";

export default function Home() {
  return (
    <div className="h-screen p-8 pt-28 pb-20 md:w-[calc(80%-50px)] overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle>熱門社群</CardTitle>
          <CardDescription>社群成員人數 150+</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 overflow-y-auto h-[150px]">
          <div className="flex-basis-[calc(20%-8px)]">
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
          <div className="flex-basis-[calc(20%-8px)]">
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
          <div className="flex-basis-[calc(20%-8px)]">
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
          <div className="flex-basis-[calc(20%-8px)]">
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
          <div className="flex-basis-[calc(20%-8px)]">
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
      <Separator className="my-6"></Separator>
      <section>
        <h2 className="text-xl font-bold text-primary mb-6">健身房推薦</h2>
        <div className="flex flex-wrap gap-3">
          <RankingCardItem></RankingCardItem>
          <RankingCardItem></RankingCardItem>
          <RankingCardItem></RankingCardItem>
          <RankingCardItem></RankingCardItem>
        </div>
      </section>
    </div>
  );
}
