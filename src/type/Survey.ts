import { BaseType } from "./baseType";

export interface Survey extends BaseType {
  surveyHeader?: SurveyHeader;
  surveyBody?: SurveyBody;
}

export interface SurveyHeader extends BaseType {
  id?: string | null;
  name: string;
  description: string;
}

export interface SurveyBody extends BaseType {
  surveyForm: Array<Question>;
  rowId: number;
}

export interface Question extends BaseType {
  questionText: string;
  questionType: QuestionType;
  options?: Option;
}

export interface Option {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export enum QuestionType {
  MCQ,
  STAR_RATING,
  DESCRIPTIVE,
  NUMBER_RATING,
  SHORT_ANSWER,
  SINGLE_CHOICE,
  YES_NO,
}
