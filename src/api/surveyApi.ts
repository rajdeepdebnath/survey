import axios from "axios";
import { SurveyBody, SurveyHeader } from "../type/Survey";

export const createSurveyApi = async (
  surveyHeader: SurveyHeader
): Promise<string> => {
  const response = await axios.post(
    "https://izrmdya4vg.execute-api.ap-south-1.amazonaws.com/prod/create_survey_request",
    surveyHeader
  );

  console.log(response);

  return response.data as string;
};

export const getAllSurveyApi = async (): Promise<Array<SurveyHeader>> => {
  const response = await axios.get(
    "https://izrmdya4vg.execute-api.ap-south-1.amazonaws.com/prod/create_survey_request"
  );

  console.log(response);

  return response.data as Array<SurveyHeader>;
};

export const saveSurveyFormApi = async (
  survey: SurveyBody
): Promise<string> => {
  const response = await axios.post(
    "https://izrmdya4vg.execute-api.ap-south-1.amazonaws.com/prod/create_survey_request",
    survey
  );

  console.log(response);

  return response.data.message as string;
};
