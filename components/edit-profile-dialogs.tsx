"use client";

import React from "react";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCamera,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const coverPhotoSchema = z.object({
  coverPhoto: z.string().url(),
});

const avatarSchema = z.object({
  avatar: z.string().url(),
});

const basicInfoSchema = z.object({
  userName: z.string().min(2).max(100),
  selfIntroduction: z.string().min(1).max(500),
  personalTags: z.string().array(),
});

const EditCoverPhoto = () => {
  const form = useForm<z.infer<typeof coverPhotoSchema>>({
    resolver: zodResolver(coverPhotoSchema),
    defaultValues: {
      coverPhoto: "",
    },
  });

  return (
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              console.log(data);
            })}
          >
            <FormField
              control={form.control}
              name="coverPhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">照片檔案</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-end mt-3">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  取消
                </Button>
              </DialogClose>
              <Button type="submit">儲存</Button>
            </DialogFooter>
          </form>
        </Form>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              照片檔案
            </Label>
            <Input id="name" type="file" className="col-span-3" />
          </div>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

const EditAvatar = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="absolute -bottom-3 -left-3"
          variant="outline"
          size="icon"
        >
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
  );
};

const EditBasicInfo = ({
  userName,
  selfIntroduction,
  personalTags,
}: {
  userName: string;
  selfIntroduction: string;
  personalTags: string[];
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="absolute right-2 bottom-2"
                variant="outline"
                size="icon"
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>編輯個人資料</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="name" className="text-right">
                    姓名
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="請輸入姓名"
                    defaultValue={userName}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="self-intro" className="text-right">
                    自我介紹(500字以內)
                  </Label>
                  <Textarea
                    id="self-intro"
                    name="selfIntro"
                    placeholder="寫點什麼吧！讓大家快速認識你：）"
                    defaultValue={selfIntroduction}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-5 items-start gap-4">
                  <Label htmlFor="tags" className="text-right">
                    個人標籤
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    type="text"
                    placeholder="新增標籤"
                    className="col-span-3"
                  />
                  <Button size="icon">
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {personalTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-sm rounded-sm shadow-sm text-neutral-100"
                    >
                      {tag}
                    </Badge>
                  ))}
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
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">編輯個人資料</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { EditCoverPhoto, EditAvatar, EditBasicInfo };
