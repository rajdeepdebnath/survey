export interface Survey {
  surveyHeader?: SurveyHeader;
  surveyBody?: SurveyBody;
}

export interface SurveyHeader {
  id?: number | null;
  name: string;
  description?: string;
  updatedDate?: string;
}

export interface SurveyBody {
  surveyForm: Array<Question>;
  rowId: number;
}

export interface Question {
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
