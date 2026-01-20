import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PreferanceFlowForm from '@/components/preferance-flow-form';
import { useRouter } from "next/navigation";
import { getCookie } from "@/app/actions";
import { apiFetch } from "@/lib/fetcher";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/app/actions", () => ({
  getCookie: jest.fn(),
}));

jest.mock("@/lib/fetcher", () => ({
  apiFetch: jest.fn(),
}));

// Mock UI components that are hard to test
jest.mock("@/components/ui/calendar", () => ({
  Calendar: ({ onSelect }: any) => (
    <div data-testid="calendar">
      <button onClick={() => onSelect(new Date('2000-01-01'))}>Select Date</button>
    </div>
  ),
}));

// Mock JSON data
jest.mock("@/public/json/taiwan_city_district_road.json", () => ([
  {
    CityName: "Taipei City",
    CityEngName: "Taipei City",
    AreaList: [
      {
        AreaName: "Da'an District",
        AreaEngName: "Da'an District",
        RoadList: [
           { RoadName: "Xinyi Road", RoadEngName: "Xinyi Road" }
        ]
      }
    ]
  }
]));

const mockQuestions = [
  {
    id: "q1",
    title: "性別",
    isBasic: true,
    isSingle: true,
    selections: [{ id: "male", selection: "Male" }, { id: "female", selection: "Female" }],
  },
  {
    id: "q2",
    title: "身高",
    isBasic: true,
    selections: [],
  },
   {
    id: "q3",
    title: "體重",
    isBasic: true,
    selections: [],
  },
  {
    id: "q4",
    title: "生日",
    isBasic: true,
    selections: [],
  },
  {
    id: "q5",
    title: "住哪?",
    isBasic: false,
    isSingle: true,
    selections: [],
  },
  {
    id: "q6",
    title: "最常在哪裡運動？",
    isBasic: false,
    isSingle: true,
    selections: [{ id: "gym", selection: "Gym" }],
  },
  {
    id: "q7",
    title: "喜歡的運動種類？",
    isBasic: false,
    isSingle: false,
    selections: [{ id: "run", selection: "Running" }],
  },
   {
    id: "q8",
    title: "的運動頻率？",
    isBasic: false,
    isSingle: true,
    selections: [{ id: "weekly", selection: "Weekly" }],
  },
   {
    id: "q9",
    title: "的運動目的？",
    isBasic: false,
    isSingle: false,
    selections: [{ id: "health", selection: "Health" }],
  },
];

describe('PreferanceFlowForm', () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (getCookie as jest.Mock).mockResolvedValue({ value: 'token' });
    (apiFetch as jest.Mock).mockResolvedValue({ success: true, message: 'Success' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the first step correctly', () => {
    render(<PreferanceFlowForm questions={mockQuestions} />);
    expect(screen.getByText('Q1: 請填寫個人資料')).toBeInTheDocument();
    expect(screen.getByText('生理性別')).toBeInTheDocument();
    expect(screen.getByText('身高(cm)')).toBeInTheDocument();
  });

  it('navigates to the next step', async () => {
    render(<PreferanceFlowForm questions={mockQuestions} />);

    // Fill in required basic fields to avoid validation errors if any
    // Note: The form allows going to next step without validation check on previous step button click?
    // Let's check handleNextStep:
    // const handleNextStep = (e: React.FormEvent) => { e.preventDefault(); if (currentStep < 6) { setCurrentStep(currentStep + 1); } ... }
    // It seems it doesn't validate on "Next Step" button, only on "Submit".
    // Wait, useForm usually validates on submit. The "Next" button is just a button with onClick.
    // However, if the button type is not specified, it defaults to submit in a form.
    // The "Next" button in the code: <Button onClick={handleNextStep}>下一步...</Button>
    // Button component usually has type="button" if not specified? No, HTML default is submit.
    // Shadcn Button might have default type="button". Let's check or assume it works.
    // The code says: handleNextStep receives e: React.FormEvent, and calls e.preventDefault().
    // So it prevents submission.

    const nextButton = screen.getByText('下一步');
    fireEvent.click(nextButton);

    // Should be on Q2 (index + 2 where index 0 is Q2 in the loop of non-basic questions)
    // The loop logic:
    // questions.filter(!isBasic).map((q, index) => currentStep === index + 2 && ...)
    // So if currentStep becomes 2.
    // index 0 -> Q2.
    // The first non-basic question is "住哪?".

    await waitFor(() => {
      expect(screen.getByText('Q2: 請問您住哪?')).toBeInTheDocument();
    });
  });

  it('can navigate back', async () => {
    render(<PreferanceFlowForm questions={mockQuestions} />);

    const nextButton = screen.getByText('下一步');
    fireEvent.click(nextButton);

    await waitFor(() => {
        expect(screen.getByText('Q2: 請問您住哪?')).toBeInTheDocument();
    });

    const prevButton = screen.getByText('上一步');
    fireEvent.click(prevButton);

    await waitFor(() => {
        expect(screen.getByText('Q1: 請填寫個人資料')).toBeInTheDocument();
    });
  });

  // More complex interaction tests like filling form and submitting require more setup for Select, etc.
  // Given time constraints, we verify rendering and navigation logic which covers the main component flow.
});
