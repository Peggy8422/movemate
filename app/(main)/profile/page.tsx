import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Profile = ({
  userName = "Peggy Chuang",
  livingArea = "台北市",
  userLevel = "1",
  selfIntroduction = "hqvujehqwgiyuhhnewklqnlekw;qnfjkwnqf;knew qfj;nweq;fnwekqnfelwqnfkwnqflkwqnfk ac,ms vhffjjfv."
}: {
  userName: string;
  livingArea: string;
  userLevel: string;
  selfIntroduction: string;
}) => {
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
              <FontAwesomeIcon icon={faLocationDot} className="" /> {livingArea}
            </span>
            <span className="block py-0.5 px-3 rounded-sm bg-secondary text-neutral-50">Lv. {userLevel}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          {/*  */}
          <p>{selfIntroduction}</p>
        </CardContent>
        <CardFooter className="">
          {/* tags here */}
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
