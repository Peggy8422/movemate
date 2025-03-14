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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPlus,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCookie } from "@/app/actions";

const getProfileData = async () => {
  const token = await getCookie("token");
  const userData = await getCookie("user");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/flow/getFlowAnswer`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  const { data } = await response.json();
  let userBasicInfo;
  console.log(data);
  if (userData?.value) {
    userBasicInfo = JSON.parse(userData.value);
  }
  console.log("User Info: ", userBasicInfo);
  console.log(
    "Token Expired: ",
    userBasicInfo.exp < Date.now() - userBasicInfo.iat
  );

  // return data;
  return {
    userName: userBasicInfo.name,
    userAvatar: userBasicInfo.coverPhoto,
    userCoverPhoto: userBasicInfo.coverPhoto,
    userSexual: data?.find(
      (item: { questionTitle: string }) => item.questionTitle === "性別"
    )?.selections[0].selectionText,
    userAge: data?.find(
      (item: { questionTitle: string }) => item.questionTitle === "年齡"
    )?.textAnswer,
    userHeight: data?.find(
      (item: { questionTitle: string }) => item.questionTitle === "身高"
    )?.textAnswer,
    userWeight: data?.find(
      (item: { questionTitle: string }) => item.questionTitle === "體重"
    )?.textAnswer,
    livingArea: data
      ?.find(
        (item: { questionTitle: string }) => item.questionTitle === "住哪?"
      )
      ?.textAnswer.slice(0, 3),
    userLevel: "1",
    selfIntroduction: "",
    personalTags: ["喜歡動物", "喜歡旅遊", "喜歡美食", "喜歡運動"],
    preferance: {
      place: data?.find(
        (item: { questionTitle: string }) =>
          item.questionTitle === "最常在哪裡運動？"
      ).selections,
      sportType: data?.find(
        (item: { questionTitle: string }) =>
          item.questionTitle === "喜歡的運動種類？"
      ).selections,
    },
  };
};

const Profile = async () => {
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
        <Image
          className="w-full h-60 object-cover"
          src={userCoverPhoto}
          alt="Profile Cover"
          width={1000}
          height={500}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute right-5 top-5" variant="outline">
              <FontAwesomeIcon icon={faCamera} />
              編輯封面照
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>編輯封面照</DialogTitle>
              <DialogDescription>
                上傳照片檔案以更換封面相片（格式：jpg, png, jpeg，檔案大小不超過
                5MB）
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  照片檔案
                </Label>
                <Input id="name" type="file" className="col-span-3" />
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  取消
                </Button>
              </DialogClose>
              <Button type="submit">儲存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="absolute ml-5 -mt-10">
          <Image
            className="border-4 border-white rounded-xl"
            src={userAvatar}
            alt="Paofile Avatar"
            width={100}
            height={100}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="absolute -bottom-3 -left-3" variant="outline" size="icon">
                <FontAwesomeIcon icon={faCamera} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>編輯大頭貼照</DialogTitle>
                <DialogDescription>
                  上傳照片檔案以更換大頭貼照（格式：jpg, png, jpeg，檔案大小不超過
                  5MB）
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    照片檔案
                  </Label>
                  <Input id="name" type="file" className="col-span-3" />
                </div>
              </div>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    取消
                  </Button>
                </DialogClose>
                <Button type="submit">儲存</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
          <p>{selfIntroduction}</p>
        </CardContent>
        <CardFooter className="">
          {/* tags here */}
          <div className="flex gap-2">
            {personalTags.map((tag) => (
              <Badge key={tag} className="">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
      <Separator className="my-4" />
      <div className="mb-6">
        <h3 className="font-bold text-primary flex items-center gap-3 mb-3">
          偏好的運動場所{" "}
          {preferance.place.length < 5 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-md w-6 h-6 hover:bg-primary hover:text-neutral-50"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">新增常去的運動場所（至多5項）</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </h3>
        <div className="flex flex-wrap gap-3 ">
          {preferance.place.map(
            (p: { selectionId: string; selectionText: string }) => (
              <Badge
                key={p.selectionId}
                variant="secondary"
                className="text-sm rounded-sm shadow-sm text-neutral-100"
              >
                {p.selectionText}
              </Badge>
            )
          )}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-primary flex items-center gap-3 mb-3">
          喜歡的運動種類/項目{" "}
          {preferance.sportType.length < 5 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-md w-6 h-6 hover:bg-primary hover:text-neutral-50"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">新增運動種類/項目（至多5項）</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </h3>
        <div className="flex flex-wrap gap-3 ">
          {preferance.sportType.map(
            (p: { selectionId: string; selectionText: string }) => (
              <Badge
                key={p.selectionId}
                variant="secondary"
                className="text-sm rounded-sm shadow-sm text-neutral-100"
              >
                {p.selectionText}
              </Badge>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
