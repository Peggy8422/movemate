export interface Question {
  id: string;
  title: string;
  isSingle: boolean;
  selections: object[];
}