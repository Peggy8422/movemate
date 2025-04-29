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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
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

import { getCookie, setCookie } from "@/app/actions";
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
                      accept="image/jpg, image/jpeg, image/png"
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

          router.refresh();
        } else {
          console.error("Upload failed:", message);
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
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
                      accept="image/jpg, image/jpeg, image/png"
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

  const [tempTags, setTempTags] = useState<string[]>(
    personalTags.length === 1 && personalTags[0] === "新增標籤"
      ? []
      : [...personalTags]
  );

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
    setTempTags((prevTags) => [...prevTags, form.getValues("tag")]);
    form.setValue("tag", "");
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
    console.log("saving before submit: ", updatedData);

    if (token?.value) {
      try {
        const res = await fetch(`${BASE_URL}/profile/savePersonalProfile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
          body: JSON.stringify(updatedData),
        });
        const result = await res.json();
        const { success, message } = result;
        if (success) {
          console.log(message);
          alert("個人資料更新成功");
        } else {
          console.error("Update failed:", message);
        }
      } catch (error) {
        console.error("Error updating user info:", error);
        alert("更新失敗，請稍後再試");
      }
    } else {
      console.error("Token is undefined");
      alert("身份未驗證！");
      return;
    }

    startTransition(() => {
      form.reset();
      router.refresh();
    });
  };

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
                            value={field.value || ""}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}
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
                            value={field.value || ""}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}
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

const AddNewAnswerItem = ({
  labelName,
  tooltipContent,
  answerId,
}: {
  labelName: string;
  tooltipContent: string;
  answerId: string;
}) => {
  const [newItem, setNewItem] = useState<string>("");

  const handleAddNewItem = () => {
    if (newItem.trim() === "") return;
    console.log(`新增${labelName}(${answerId}): ${newItem}`);
    setNewItem("");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <Popover>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-md w-6 h-6 hover:bg-primary hover:text-neutral-50"
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <PopoverContent className="w-80">
            <div className="flex items-center gap-4">
              <Label htmlFor="place" className="text-nowrap">
                {labelName}
              </Label>
              <Input
                id="place"
                defaultValue={newItem}
                className="col-span-2 h-8"
                onChange={(e) => setNewItem(e.target.value)}
              />
              <PopoverClose asChild>
                <Button
                  className="w-20 h-8"
                  type="submit"
                  onClick={handleAddNewItem}
                >
                  新增
                </Button>
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
        <TooltipContent>
          <p className="text-xs">{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { EditCoverPhoto, EditAvatar, EditBasicInfo, AddNewAnswerItem };
