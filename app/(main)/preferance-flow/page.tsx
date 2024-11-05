"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    height: z.number().min(1),
    weight: z.number().min(1),
    sexual: z.string(),
    age: z.number().min(18),
  })
  .required();

const PreferanceFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: undefined,
      weight: undefined,
      sexual: "male", // boy: 1, girl: 2
      age: undefined,
    },
  });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="w-10/12 sm:w-1/2 mx-auto mt-16 max-w-[600px]">
      {currentStep === 1 && (
        <div>
          <h1 className="mb-3">Ｑ1: 請填寫個人資料</h1>
          <div className="border-solid border-2 rounded-3xl border-neutral-500 text-neutral-500 px-6 py-1 inline-block mb-3">
            關於你
          </div>

          <Form {...form}>
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="mb-6 flex gap-2">
                  <FormLabel className="w-[100px] min-w-fit pt-2">身高</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} placeholder="請輸入身高" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="mb-6 flex gap-2">
                  <FormLabel className="w-[100px] min-w-fit pt-2">體重</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} placeholder="請輸入體重" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sexual"
              render={({ field }) => (
                <FormItem className="mb-6 flex gap-2">
                  <FormLabel className="w-[100px] min-w-fit pt-2">
                    生理性別
                  </FormLabel>
                  <FormControl>
                    <Tabs defaultValue={field.value} className="w-full">
                      <TabsList className="bg-transparent w-full p-0">
                        <TabsTrigger
                          value="male"
                          className="flex-grow border-2 border-secondary text-secondary data-[state=active]:text-neutral-50 data-[state=active]:bg-primary data-[state=active]:border-primary"
                        >
                          生理男
                        </TabsTrigger>
                        <TabsTrigger
                          value="female"
                          className="flex-grow border-2 border-secondary text-secondary bg-white data-[state=active]:text-neutral-50 data-[state=active]:bg-primary data-[state=active]:border-primary"
                        >
                          生理女
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="mb-6 flex gap-2">
                  <FormLabel className="w-[100px] min-w-fit pt-2">
                    年齡
                  </FormLabel>
                  <FormControl>
                    <Input type="number" min={18} placeholder="請輸入年齡" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-10 flex justify-end">
              <Button type="submit" onClick={handleNextStep}>
                下一步
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default PreferanceFlow;
