import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

import ImageWithFallback from "@/components/image-with-fallback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
// import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCookie } from "@/app/actions";

import {
  EditCoverPhoto,
  EditAvatar,
  EditBasicInfo,
  AddNewAnswerItem,
  AnswerItemTag,
} from "@/components/edit-profile-dialogs";
// import { X } from "lucide-react";

const getProfileData = async () => {
  const token = await getCookie("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/profile/getPersonalPorfile`,
    {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-store",
    }
  );
  const { data } = await response.json();
  const userBasicInfo = data.profile;
  const userAnswers = data.answers;

  return {
    userName: userBasicInfo.name,
    userAvatar: userBasicInfo.profilePic || "/default_user_avatar_1.png",
    userCoverPhoto: userBasicInfo.coverPhoto || "/default_user_cover.jpeg",
    userSexual: userAnswers?.find(
      (item: { questionTitle: string }) => item.questionTitle === "性別"
    )?.selections[0].selectionText,
    userAge: userAnswers?.find(
      (item: { questionTitle: string }) => item.questionTitle === "年齡"
    )?.textAnswers,
    userHeight: userAnswers?.find(
      (item: { questionTitle: string }) => item.questionTitle === "身高"
    )?.textAnswers,
    userWeight: userAnswers?.find(
      (item: { questionTitle: string }) => item.questionTitle === "體重"
    )?.textAnswers,
    livingArea: userAnswers
      ?.find(
        (item: { questionTitle: string }) => item.questionTitle === "住哪?"
      )
      ?.textAnswers[0]?.slice(0, 3),
    userLevel: "1",
    selfIntroduction: userBasicInfo.intro || "",
    personalTags: userBasicInfo.personalTags || ["新增標籤"],
    preferance: {
      place: userAnswers?.find(
        (item: { questionTitle: string }) =>
          item.questionTitle === "最常在哪裡運動？"
      ),
      sportType: userAnswers?.find(
        (item: { questionTitle: string }) =>
          item.questionTitle === "喜歡的運動種類？"
      ),
    },
  };
};

const Profile = async () => {
  // use dynamic key to mount/unmount image
  const refreshImgId = Date.now();
  // fetch data here
  const {
    userName,
    userAvatar,
    userCoverPhoto,
    userAge,
    userSexual,
    userHeight,
    userWeight,
    livingArea,
    userLevel,
    selfIntroduction,
    personalTags,
    preferance,
  } = await getProfileData();

  return (
    <div className="p-10 sm:p-5">
      <Card className="mt-20 overflow-hidden relative">
        {/* edit: cover photo, avatar, name, living area, self introduction, personal tags */}
        <ImageWithFallback
          key={refreshImgId}
          className="w-full h-60 object-cover"
          src={`/api/image-proxy?url=${encodeURIComponent(
            userCoverPhoto || ""
          )}`}
          fallbackSrc="/default_user_cover.jpeg"
          alt="Profile Cover"
          priority
          width={1000}
          height={500}
          crossOrigin="anonymous"
        />
        <EditCoverPhoto></EditCoverPhoto>
        <div className="absolute ml-5 -mt-10">
          <ImageWithFallback
            key={refreshImgId + 1}
            className="border-4 border-white rounded-xl bg-[#DEE6E8] w-[100px] h-[100px] object-cover"
            src={`/api/image-proxy?url=${encodeURIComponent(userAvatar || "")}`}
            fallbackSrc="/default_user_avatar_1.png"
            alt="Profile Avatar"
            width={100}
            height={100}
            crossOrigin="anonymous"
          />
          <EditAvatar></EditAvatar>
        </div>
        <CardHeader className="relative w-[calc(100%-120px)] flex flex-row flex-wrap items-end gap-3 left-[120px] px-3 py-3">
          <CardTitle className="text-primary">{userName}</CardTitle>
          <div className="flex-1 text-primary">
            <CardDescription className="flex justify-between items-center flex-wrap">
              <span className="block">
                <FontAwesomeIcon icon={faLocationDot} className="" />{" "}
                {livingArea}
              </span>
              <span className="block py-0.5 px-3 rounded-sm bg-secondary text-neutral-50">
                Lv. {userLevel}
              </span>
            </CardDescription>
            <CardDescription className="text-neutral-400 text-xs">
              {userSexual} /{userAge}(y) /{userHeight}(cm) /{userWeight}(kg)
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {selfIntroduction ||
              `Hi~ 我是${userName}，期待在這裡和大家一起享受運動樂趣！`}
          </p>
        </CardContent>
        <CardFooter className="">
          {/* tags here */}
          <div className="flex flex-wrap gap-2">
            {personalTags.map((tag: string) => (
              <Badge key={tag}>#{tag}</Badge>
            ))}
          </div>
        </CardFooter>
        <EditBasicInfo
          userName={userName}
          selfIntroduction={selfIntroduction}
          personalTags={personalTags}
        ></EditBasicInfo>
      </Card>
      <Separator className="my-4" />
      <div className="mb-6">
        <h3 className="font-bold text-primary flex items-center gap-3 mb-3">
          偏好的運動場所
        </h3>
        <div className="flex flex-wrap gap-3 ">
          {preferance.place.selections.map(
            (p: { selectionId: string; selectionText: string }) => (
              <AnswerItemTag
                key={p.selectionId}
                selectionId={p.selectionId}
                selectionText={p.selectionText}
                answerId={preferance.place.answer_id}
                questionId={preferance.place.questionId}
                selectionIds={preferance.place.selections.map(
                  (p: { selectionId: string; selectionText: string }) =>
                    p.selectionId
                )}
              ></AnswerItemTag>
              // <Badge
              //   key={p.selectionId}
              //   variant="secondary"
              //   className="text-sm rounded-sm shadow-sm text-neutral-100"
              // >
              //   {p.selectionText}
              // </Badge>
            )
          )}
          {/* {preferance.place.textAnswers?.map(
            (p: string) => (
              <Badge
                key={p}
                variant="secondary"
                className="text-sm rounded-sm shadow-sm text-neutral-100"
              >
                {p}
              </Badge>
            )
          )} */}
          {/* add new item */}
          {/* popover */}
          {preferance.place.selections.length < 5 && (
            <AddNewAnswerItem
              answerId={preferance.place.answer_id}
              questionId={preferance.place.questionId}
              selectionIds={preferance.place.selections.map(
                (p: { selectionId: string; selectionText: string }) =>
                  p.selectionId
              )}
              labelName="運動場所"
              tooltipContent="新增常去的運動場所（至多5項）"
            />
          )}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-primary flex items-center gap-3 mb-3">
          喜歡的運動種類/項目
        </h3>
        <div className="flex flex-wrap gap-3 ">
          {preferance.sportType.selections.map(
            (s: { selectionId: string; selectionText: string }) => (
              <AnswerItemTag
                key={s.selectionId}
                selectionId={s.selectionId}
                selectionText={s.selectionText}
                answerId={preferance.place.answer_id}
                questionId={preferance.place.questionId}
                selectionIds={preferance.place.selections.map(
                  (s: { selectionId: string; selectionText: string }) =>
                    s.selectionId
                )}
              ></AnswerItemTag>
              // <Badge
              //   key={p.selectionId}
              //   variant="secondary"
              //   className="text-sm rounded-sm shadow-sm text-neutral-100"
              // >
              //   {p.selectionText}
              // </Badge>
            )
          )}
          {/* add new item */}
          {preferance.sportType.selections.length < 5 && (
            <AddNewAnswerItem
              answerId={preferance.sportType.answer_id}
              questionId={preferance.sportType.questionId}
              selectionIds={preferance.sportType.selections.map(
                (p: { selectionId: string; selectionText: string }) =>
                  p.selectionId
              )}
              labelName="運動項目"
              tooltipContent="新增運動種類/項目（至多5項）"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
