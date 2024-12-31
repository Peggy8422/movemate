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
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

const getProfileData = async () => {
  // const response = await fetch("https://api.example.com/profile");
  // const data = await response.json();
  // return data;
  return {
    userName: "Peggy Chuang",
    livingArea: "台北市",
    userLevel: "1",
    selfIntroduction:
      "hqvujehqwgiyuhhnewklqnlekw;qnfjkwnqf;knew qfj;nweq;fnwekqnfelwqnfkwnqflkwqnfk ac,ms vhffjjfv.",
    personalTags: [
      "熱情",
      "有趣",
      "喜歡動物",
      "喜歡旅遊",
      "喜歡美食",
      "喜歡運動",
    ],
  };
};

const Profile = async () =>
  //   {
  //   userName = "Peggy Chuang",
  //   livingArea = "台北市",
  //   userLevel = "1",
  //   selfIntroduction = "hqvujehqwgiyuhhnewklqnlekw;qnfjkwnqf;knew qfj;nweq;fnwekqnfelwqnfkwnqflkwqnfk ac,ms vhffjjfv."
  // }: {
  //   userName: string;
  //   livingArea: string;
  //   userLevel: string;
  //   selfIntroduction: string;
  // }
  {
    // fetch data here
    const { userName, livingArea, userLevel, selfIntroduction, personalTags } =
      await getProfileData();

    return (
      <div className="p-10 sm:p-5">
        <Card className="mt-20 overflow-hidden relative">
          <Image
            className="w-full h-60 object-cover"
            src="https://lh3.googleusercontent.com/a/ACg8ocK5PQ8ri8UGY3DvY7a7zXb9oen_tfiCp_fTKg4RyCupqvd5ZkCr=s576-c-no"
            alt="Profile Cover"
            width={1000}
            height={500}
          />
          <Image
            className="absolute border-4 border-white rounded-xl ml-5 -mt-10"
            src="https://lh3.googleusercontent.com/a/ACg8ocK5PQ8ri8UGY3DvY7a7zXb9oen_tfiCp_fTKg4RyCupqvd5ZkCr=s576-c-no"
            alt="Paofile Avatar"
            width={100}
            height={100}
          />
          <CardHeader className="relative w-[calc(100%-120px)] flex flex-row items-end gap-3 left-[120px] px-3">
            <CardTitle className="text-primary">{userName}</CardTitle>
            <CardDescription className="flex-1 text-primary flex justify-between items-center">
              <span className="block">
                <FontAwesomeIcon icon={faLocationDot} className="" />{" "}
                {livingArea}
              </span>
              <span className="block py-0.5 px-3 rounded-sm bg-secondary text-neutral-50">
                Lv. {userLevel}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-neutral-800">
            {/*  */}
            <p>{selfIntroduction}</p>
          </CardContent>
          <CardFooter className="">
            {/* tags here */}
            <div className="flex gap-2">
              {personalTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary text-neutral-50 text-sm rounded-full "
                >
                  #{tag}
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
        <Separator className="my-4" />
        <div>
          <h3 className="font-bold text-primary">
            偏好的運動場所{" "}
            <Button variant="outline" size="icon" className="rounded-md w-6 h-6">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </h3>
        </div>
        <div>
          <h3 className="font-bold text-primary">
            喜歡的運動種類/項目{" "}
            <Button variant="outline" size="icon" className="rounded-md w-6 h-6">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </h3>
        </div>
      </div>
    );
  };

export default Profile;
