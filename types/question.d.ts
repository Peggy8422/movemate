export interface Question {
  id: string;
  title: string;
  isSingle: boolean;
  isBasic: boolean;
  order: number;
  selections: object[
    {
      id: string;
      selection: string;
      textAnswer?: string;
    }
  ];
}