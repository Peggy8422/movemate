"use client";

import React, { useState } from "react";
import taiwanCityDistrictRoads from "@/public/json/taiwan_city_district_road.json";
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

// import {
//   placeOptions,
//   sportTypeOptions,
//   purposeOptions,
//   frequencyOptions,
// } from "@/consts/preferance-flow-options";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Question } from "@/types/question";

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

const questionNameMap: { [key: string]: string } = {
  身高: "height",
  體重: "weight",
  性別: "sexual",
  年齡: "age",
  "住哪?": "city",
  "最常在哪裡運動？": "place",
  "喜歡的運動種類？": "sportType",
  "的運動頻率？": "frequency",
  "的運動目的？": "purpose",
};

const PreferanceFlowForm = ({ questions }: { questions: Question[] }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    // shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: null,
      weight: null,
      sexual: "",
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
  form.setValue(
    "sexual",
    questions.find((q) => q.title === "性別")?.selections[0].id
  );

  const districtOptions = taiwanCityDistrictRoads.find(
    (item: {
      CityName: string;
      AreaList: {
        AreaName: string;
        RoadList: { RoadName: string; RoadEngName: string }[];
      }[];
    }) => item.CityName === form.watch("city")
  )?.AreaList;
  const roadOptions = districtOptions?.find(
    (item: {
      AreaName: string;
      RoadList: { RoadName: string; RoadEngName: string }[];
    }) => item.AreaName === form.watch("district")
  )?.RoadList;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // sent to backend
    console.log(data);
    const payload = questions.map((question: Question) => ({
      questionId: question.id,
      selectionId:
        (question.isBasic && question.title !== "性別") ||
        question.title === "住哪?"
          ? []
          : question.isSingle
          ? [data[questionNameMap[question.title] as keyof typeof data]]
          : data[questionNameMap[question.title] as keyof typeof data],
      textAnswer:
        question.title === "住哪?"
          ? `${data.city}${data.district}${data.road}`
          : question.isBasic && question.title !== "性別"
          ? data[
              questionNameMap[question.title] as keyof typeof data
            ]?.toString()
          : null,
    }));
    console.log("Answer: ",payload);
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
              {questions
                ?.filter((question: Question) => question.isBasic)
                .map((question: Question) =>
                  question.title === "性別" ? (
                    <FormField
                      key={question.id}
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
                                {question.selections.map(
                                  (item: { id: string; selection: string }) => (
                                    <TabsTrigger
                                      key={item.id}
                                      value={item.id}
                                      className="flex-grow border-2 border-secondary text-secondary data-[state=active]:text-neutral-50 data-[state=active]:bg-primary data-[state=active]:border-primary dark:data-[state=active]:bg-neutral-600 dark:data-[state=active]:border-neutral-600"
                                    >
                                      {item.selection}
                                    </TabsTrigger>
                                  )
                                )}
                              </TabsList>
                            </Tabs>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      key={question.id}
                      control={form.control}
                      name={
                        questionNameMap[question.title] as keyof z.infer<
                          typeof formSchema
                        >
                      }
                      render={({ field }) => (
                        <FormItem className="mb-6 flex gap-2">
                          <FormLabel className="w-[80px] min-w-fit pt-2">
                            {question.title}
                          </FormLabel>
                          <div className="flex-grow">
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                placeholder={`請輸入${question.title}`}
                                {...field}
                                value={
                                  field.value !== null
                                    ? String(field.value)
                                    : ""
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
                  )
                )}
            </div>
          )}
          {/* map questions: not basic */}
          {questions
            ?.filter((question: Question) => !question.isBasic)
            .map((question: Question, index: number) => {
              return (
                currentStep === index + 2 && (
                  <div key={question.id}>
                    <h1 className="mb-6">
                      Q{index + 2}: 請問您{question.title}
                    </h1>
                    {index + 2 === 2 && (
                      <>
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
                                    defaultValue={
                                      typeof field.value === "string"
                                        ? field.value
                                        : undefined
                                    }
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="請選擇縣市" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {taiwanCityDistrictRoads.map(
                                        (city: {
                                          CityEngName: string;
                                          CityName: string;
                                        }) => (
                                          <SelectItem
                                            key={city.CityEngName}
                                            value={city.CityName}
                                          >
                                            {city.CityName}
                                          </SelectItem>
                                        )
                                      )}
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
                                    defaultValue={
                                      typeof field.value === "string"
                                        ? field.value
                                        : undefined
                                    }
                                    disabled={form.getValues("city") === ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="請選擇區（鄉鎮）" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {districtOptions?.map(
                                        (district: {
                                          AreaEngName: string;
                                          AreaName: string;
                                        }) => (
                                          <SelectItem
                                            key={district.AreaEngName}
                                            value={district.AreaName}
                                          >
                                            {district.AreaName}
                                          </SelectItem>
                                        )
                                      )}
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
                                    defaultValue={
                                      typeof field.value === "string"
                                        ? field.value
                                        : undefined
                                    }
                                    disabled={form.getValues("district") === ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="請選擇路（街）名" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {roadOptions?.map(
                                        (road: {
                                          RoadName: string;
                                          RoadEngName: string;
                                        }) => (
                                          <SelectItem
                                            key={road.RoadEngName}
                                            value={road.RoadName}
                                          >
                                            {road.RoadName}
                                          </SelectItem>
                                        )
                                      )}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    {/* 選擇題 */}
                    {index + 2 >= 3 &&
                      (question.isSingle ? (
                        <FormField
                          control={form.control}
                          name={
                            questionNameMap[question.title] as keyof z.infer<
                              typeof formSchema
                            >
                          }
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormControl>
                                <RadioGroup
                                  defaultValue={
                                    typeof field.value === "string"
                                      ? field.value
                                      : undefined
                                  }
                                  onValueChange={field.onChange}
                                  className="space-y-4"
                                >
                                  {question.selections.map(
                                    (option: {
                                      id: string;
                                      selection: string;
                                    }) => (
                                      <div
                                        key={option.id}
                                        className="flex items-center space-x-2"
                                      >
                                        <RadioGroupItem
                                          value={option.id}
                                          id={option.id}
                                        />
                                        <Label
                                          htmlFor={option.id}
                                          className="font-normal"
                                        >
                                          {option.selection}
                                        </Label>
                                      </div>
                                    )
                                  )}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        question.selections.map(
                          (
                            option: { id: string; selection: string },
                            index: number
                          ) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name={
                                questionNameMap[
                                  question.title
                                ] as keyof z.infer<typeof formSchema>
                              }
                              render={({ field }) => (
                                <FormItem className="mb-3 flex items-center gap-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={
                                        Array.isArray(field.value) &&
                                        field.value.includes(option.id)
                                      }
                                      onCheckedChange={(checked: boolean) => {
                                        return checked
                                          ? field.onChange(
                                              field.value !== null
                                                ? Array.isArray(field.value)
                                                  ? [...field.value, option.id]
                                                  : [option.id]
                                                : [option.id]
                                            )
                                          : field.onChange(
                                              Array.isArray(field.value)
                                                ? field.value.filter(
                                                    (value: string) =>
                                                      value !== option.id
                                                  )
                                                : []
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal mt-0">
                                    {option.selection}
                                  </FormLabel>
                                  {index === 0 && <FormMessage />}
                                </FormItem>
                              )}
                            />
                          )
                        )
                      ))}
                  </div>
                )
              );
            })}
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

export default PreferanceFlowForm;
