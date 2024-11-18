"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import Link from "next/link";

import { placeOptions, sportTypeOptions, purposeOptions, frequencyOptions } from "@/consts/preferance-flow-options";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    height: z.number().min(1).int().nullable(),
    weight: z.number().min(1).int().nullable(),
    sexual: z.string(),
    age: z.number().min(18).int().nullable(),
    // live place
    city: z.string(),
    district: z.string(),
    road: z.string(),
    place: z.string(),
    sportType: z
      .array(z.string())
      .nonempty({ message: "請選擇至少一個選項" })
      .max(3, { message: "至多選擇三個選項" })
      .nullable(),
    frequency: z.string(),
    purpose: z
      .array(z.string())
      .nonempty({ message: "請選擇至少一個選項" })
      .max(3, { message: "至多選擇三個選項" })
      .nullable(),
  })
  .required();

const PreferanceFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    // shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: null,
      weight: null,
      sexual: "male", // boy: 1, girl: 2
      age: null,
      city: "",
      district: "",
      road: "",
      place: "",
      sportType: null,
      frequency: "",
      purpose: null,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // sent to backend
    console.log(data);
  };

  const handlePrevStep = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
  };
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      return;
    }
  };

  return (
    <div className="w-10/12 h-full sm:w-1/2 mx-auto mt-[150px] max-w-[600px] ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <div>
              <h1 className="mb-6">Q1: 請填寫個人資料</h1>
              {/* <div className="border-solid border-2 rounded-3xl border-neutral-500 text-neutral-500 px-6 py-1 inline-block mb-3">
            關於你
          </div> */}

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className="mb-6 flex gap-2">
                    <FormLabel className="w-[80px] min-w-fit pt-2">
                      身高
                    </FormLabel>
                    <div className="flex-grow">
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="請輸入身高"
                          {...field}
                          value={
                            field.value !== null ? String(field.value) : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value ? Number(value) : null);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="mb-6 flex gap-2">
                    <FormLabel className="w-[80px] min-w-fit pt-2">
                      體重
                    </FormLabel>
                    <div className="flex-grow">
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="請輸入體重"
                          {...field}
                          value={
                            field.value !== null ? String(field.value) : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value ? Number(value) : null);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
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
                            className="flex-grow border-2 border-secondary text-secondary data-[state=active]:text-neutral-50 data-[state=active]:bg-primary data-[state=active]:border-primary dark:data-[state=active]:bg-neutral-600 dark:data-[state=active]:border-neutral-600"
                          >
                            生理男
                          </TabsTrigger>
                          <TabsTrigger
                            value="female"
                            className="flex-grow border-2 border-secondary text-secondary data-[state=active]:text-neutral-50 data-[state=active]:bg-primary data-[state=active]:border-primary dark:data-[state=active]:bg-neutral-600 dark:data-[state=active]:border-neutral-600"
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
                    <FormLabel className="w-[80px] min-w-fit pt-2">
                      年齡
                    </FormLabel>
                    <div className="flex-grow">
                      <FormControl>
                        <Input
                          type="number"
                          min={18}
                          placeholder="請輸入年齡"
                          {...field}
                          value={
                            field.value !== null ? String(field.value) : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value ? Number(value) : null);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <h1 className="mb-6">Q2: 請問您的居住地？</h1>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="mb-6 flex gap-2">
                    <FormLabel className="w-[100px] min-w-fit pt-2">
                      縣市
                    </FormLabel>
                    <div className="flex-grow">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="請選擇縣市" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="taipei">台北市</SelectItem>
                            <SelectItem value="toayuan">桃園市</SelectItem>
                            <SelectItem value="keelung">基隆市</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem className="mb-6 flex gap-2">
                    <FormLabel className="w-[100px] min-w-fit pt-2">
                      區（鄉鎮）
                    </FormLabel>
                    <div className="flex-grow">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="請選擇區（鄉鎮）" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beitou">北投區</SelectItem>
                            <SelectItem value="shilin">士林區</SelectItem>
                            <SelectItem value="zhongzheng">中正區</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="road"
                render={({ field }) => (
                  <FormItem className="mb-6 flex gap-2">
                    <FormLabel className="w-[100px] min-w-fit pt-2">
                      路（街）
                    </FormLabel>
                    <div className="flex-grow">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="請選擇路（街）名" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="linong st2">
                              立農街二段
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <h1 className="mb-6">Q3: 請問您最常在哪裡運動?</h1>
              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        className="space-y-4"
                      >
                        {placeOptions.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                            />
                            <Label
                              htmlFor={option.value}
                              className="font-normal"
                            >
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {currentStep === 4 && (
            <div>
              <h1 className="mb-6">Q4: 請問您喜歡的運動種類？（至多選3項）</h1>
              {sportTypeOptions.map((option, index) => (
                <FormField
                  key={option.value}
                  control={form.control}
                  name="sportType"
                  render={({ field }) => (
                    <FormItem className="mb-3 flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange(
                                  field.value !== null
                                    ? [...field.value, option.value]
                                    : [option.value]
                                )
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== option.value
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal mt-0">
                        {option.text}
                      </FormLabel>
                      {index === 0 && <FormMessage />}
                    </FormItem>
                  )}
                />
              ))}
            </div>
          )}
          {currentStep === 5 && (
            <div>
              <h1 className="mb-6">Q5: 請問您的運動頻率?</h1>
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        className="space-y-4"
                      >
                        {frequencyOptions.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                            />
                            <Label
                              htmlFor={option.value}
                              className="font-normal"
                            >
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {currentStep === 6 && (
            <div>
              <h1 className="mb-6">Q6: 請問您的運動目的是什麼?（至多選3項）</h1>
              {purposeOptions.map((option, index) => (
                <FormField
                  key={option.value}
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem className="mb-6 flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange(
                                  field.value !== null
                                    ? [...field.value, option.value]
                                    : [option.value]
                                )
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== option.value
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal mt-0">
                        {option.text}
                      </FormLabel>
                      {index === 0 && <FormMessage />}
                    </FormItem>
                  )}
                />
              ))}
            </div>
          )}
          <div className="mt-10 flex justify-end gap-2">
            {currentStep > 1 && (
              <Button
                variant="outline"
                className="bg-transparent"
                onClick={handlePrevStep}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                上一步
              </Button>
            )}
            {currentStep < 6 && (
              <Button onClick={handleNextStep}>
                下一步
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            )}
            {currentStep === 6 && (
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid ||
                  Object.values(form.control._formValues).some(
                    (value) => !value
                  )
                }
              >
                完成
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PreferanceFlow;
