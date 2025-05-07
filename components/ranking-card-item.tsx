import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  //   CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const RankingCardItem = () => {
  const cardInfo = {
    name: "健身房名稱",
    ranking: 4.8,
    phoneNum: "0912345678",
    address: "台北市中山區...",
    description: "健身房描述...",
    avatarSrc: "",
  };

  return (
    <Card className="relative min-w-[200px] xs:w-full md:w-[calc(50%-12px)] flex-grow">
      {/* ranking stars */}
      <svg id="stars" style={{ display: "none" }} version="1.1">
        <symbol id="stars-empty-star" viewBox="0 0 102 18" fill="#F1E8CA">
          <path d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218" />
        </symbol>
        <symbol id="stars-full-star" viewBox="0 0 102 18" fill="#ffee35">
          <path d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218" />
        </symbol>
        <symbol id="stars-half-star" viewBox="0 0 102 18" fill="#ffee35">
          <use xlinkHref="#stars-empty-star" />
          <path d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792" />
        </symbol>
      </svg>
      {/* ranking tag */}
      <div className="absolute -top-1 left-2 w-8 h-10 rounded-[2px] rounded-b-[50%] bg-primary dark:bg-secondary text-neutral-50"></div>
      <CardContent className="flex flex-wrap gap-4 pt-6 p-3">
        <Image
          className="flex-grow w-1/2 h-[150px] object-cover rounded-md bg-slate-200"
          src={cardInfo.avatarSrc}
          alt="Profile Cover"
          priority
          width={100}
          height={100}
        />
        <div className="flex-grow">
          <CardTitle className="text-lg">{cardInfo.name}</CardTitle>
          <CardDescription>
            <span className="text-primary text-xs font-medium flex items-center">
              {cardInfo.ranking}
              <svg aria-hidden="true" focusable="false" className="block w-[110px] h-[15px] my-2" fill="currentColor">
                <use xlinkHref="#stars-full-star" />
                <use xlinkHref="#stars-full-star" style={{transform: "translate(20px)"}} />
                <use xlinkHref="#stars-full-star" style={{transform: "translate(40px)"}} />
                <use xlinkHref="#stars-full-star" style={{transform: "translate(60px)"}} />
                <use xlinkHref="#stars-half-star" style={{transform: "translate(80px)"}} />
              </svg>
            </span>
          </CardDescription>
          <CardDescription>
            <FontAwesomeIcon icon={faPhone} className="w-5" />
            電話： {cardInfo.phoneNum}
          </CardDescription>
          <CardDescription>
            <FontAwesomeIcon icon={faLocationDot} className="w-5" />
            地址： {cardInfo.address}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankingCardItem;
