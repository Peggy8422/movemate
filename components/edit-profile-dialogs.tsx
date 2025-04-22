"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
// import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCamera,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { X } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { updateUserInfo, getCookie, setCookie } from "@/app/actions";
import { jwtDecode } from "jwt-decode";
import { UserAuth } from "@/types/user";

const BASE_URL = process.env.NEXT_PUBLIC_DEV_BASE_URL;

const coverPhotoSchema = z.object({
  coverPhoto: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required."),
});

const avatarSchema = z.object({
  avatar: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required."),
});

const basicInfoSchema = z.object({
  userName: z.string().min(2).max(100),
  selfIntroduction: z.string().max(500),
  tag: z.string().max(10),
});

const EditCoverPhoto = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof coverPhotoSchema>>({
    resolver: zodResolver(coverPhotoSchema),
    defaultValues: {
      coverPhoto: undefined,
    },
  });

  const coverPhotoRef = form.register("coverPhoto");

  const onSubmitCover = async (data: z.infer<typeof coverPhotoSchema>) => {
    const token = await getCookie("token");
    const formData = new FormData();
    formData.append("file", data.coverPhoto[0]);

    if (token?.value) {
      try {
        const res = await fetch(`${BASE_URL}/profile/uploadCoverPicture`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          body: formData,
        });
        const result = await res.json();
        const { success, message } = result;
        if (success) {
          console.log(message);
          alert("封面照上傳成功");
          form.reset();
          router.refresh();
        } else {
          console.error("Upload failed:", message);
        }
      } catch (error) {
        console.error("Error uploading cover photo:", error);
      }

      // const { message, path } = await updateProfileCover(
      //   data.coverPhoto[0],
      //   token.value
      // );
      // console.log(message);
      // if (message === "Upload successful") {
      //   console.log(path);
      //   alert("封面照上傳成功");
      //   form.reset();
      //   router.refresh();
      // }
    } else {
      console.error("Token is undefined");
    }
  };

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
          <form onSubmit={form.handleSubmit(onSubmitCover)}>
            <FormField
              control={form.control}
              name="coverPhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">照片檔案</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...coverPhotoRef}
                      onChange={(event) => {
                        field.onChange(event.target?.files ?? undefined);
                      }}
                    />
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
              <DialogClose asChild>
                <Button type="submit">儲存</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const EditAvatar = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof avatarSchema>>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      avatar: undefined,
    },
  });

  const avatarRef = form.register("avatar");

  const onSubmitAvatar = async (data: z.infer<typeof avatarSchema>) => {
    const token = await getCookie("token");
    const formData = new FormData();
    formData.append("file", data.avatar[0]);

    if (token?.value) {
      try {
        const res = await fetch(`${BASE_URL}/profile/uploadProfilePicture`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          body: formData,
        });
        const result = await res.json();
        console.log("updated avatar:", result);
        const { success, message, data: userDataToken } = result;
        if (success) {
          console.log(message);
          alert("大頭貼照上傳成功");
          form.reset();
          const decodedToken = jwtDecode<UserAuth>(userDataToken);
          await setCookie("user", JSON.stringify(decodedToken));
          // const userData = await getCookie("user");
          // if (userData) {
          //   const user = JSON.parse(userData.value);
          //   user.coverPhoto = userBasicInfo.profilePic;
          //   await setCookie("user", JSON.stringify(user));
          // }

          router.refresh();
        } else {
          console.error("Upload failed:", message);
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }

      // const { message, path } = await updateUserAvatar(
      //   data.avatar[0],
      //   token.value
      // );
      // if (message === "Upload successful") {
      //   console.log(path);
      //   alert("大頭貼照上傳成功");
      //   form.reset();
      //   router.refresh();
      // }
    } else {
      console.error("Token is undefined");
    }
  };

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitAvatar)}>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">照片檔案</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...avatarRef}
                      onChange={(event) => {
                        field.onChange(event.target?.files ?? undefined);
                      }}
                    />
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
              <DialogClose asChild>
                <Button type="submit">儲存</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // const [localDialogOpen, setLocalDialogOpen] = useState(false);
  const [tempTags, setTempTags] = useState<string[]>([...personalTags]);

  const form = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      userName,
      selfIntroduction,
      tag: "",
    },
  });

  const handleAddTag = () => {
    if (form.getValues("tag") === "") {
      return;
    }
    setTempTags([...tempTags, form.getValues("tag")]);
    form.reset();
    form.clearErrors();
  };

  const handleDeleteTag = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    setTempTags(tempTags.filter((t) => t !== (e.target as SVGElement).id));
  };

  const onSubmit = async (data: z.infer<typeof basicInfoSchema>) => {
    const token = await getCookie("token");
    const updatedData = {
      name: data.userName,
      intro: data.selfIntroduction,
      personalTags: [...tempTags],
    };
    console.log(updatedData);

    if (token?.value === undefined) {
      console.error("Token is undefined");
      return;
    }
    const userData = await updateUserInfo(updatedData, token?.value || "");
    console.log(userData);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Dialog
            onOpenChange={(open) => {
              if (!open) {
                form.reset();
                setTempTags([...personalTags]);
              }
            }}
          >
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
                <DialogDescription>
                  修改姓名、新增自我介紹內容
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary">姓名</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="請輸入姓名"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="selfIntroduction"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        <FormLabel className="text-primary">
                          自我介紹(500字以內)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="寫點什麼吧！讓大家快速認識你：）"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        <FormLabel className="text-primary">個人標籤</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              placeholder="新增標籤"
                              {...field}
                            />
                            <Button
                              size="icon"
                              type="button"
                              variant="outline"
                              onClick={handleAddTag}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tempTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-sm rounded-sm shadow-sm text-neutral-100"
                      >
                        {tag}
                        <X
                          className="cursor-pointer"
                          id={tag}
                          onClick={handleDeleteTag}
                        />
                      </Badge>
                    ))}
                  </div>
                  <DialogFooter className="sm:justify-end mt-6">
                    {/* set tempTags to personalTags when close dialog */}
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        取消
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        disabled={!form.formState.isValid || isPending}
                      >
                        儲存
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
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
