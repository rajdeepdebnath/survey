export interface Survey {
  surveyHeader?: SurveyHeader;
  surveyBody?: Array<Question>;
}

export interface SurveyHeader {
  id?: number | null;
  name: string;
  description?: string;
  updatedDate?: string;
}

export interface SurveyForm {
  survey_form: Array<Question>;
  row_id: number;
}

export interface Question {
  questionText: string;
  questionType: QuestionType;
  options?: Array<string>;
  isRequired: boolean;
}

export interface Option {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export enum QuestionType {
  MCQ = "MCQ",
  STAR_RATING = "STAR_RATING",
  EMOJI_RATING = "EMOJI_RATING",
  DESCRIPTIVE = "DESCRIPTIVE",
  NUMBER_RATING = "NUMBER_RATING",
  SHORT_ANSWER = "SHORT_ANSWER",
  SINGLE_CHOICE = "SINGLE_CHOICE",
  YES_NO = "YES_NO",
}
