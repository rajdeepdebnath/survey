import axios from "axios";
import { SurveyForm, SurveyHeader } from "../type/Survey";

axios.defaults.baseURL =
  "https://izrmdya4vg.execute-api.ap-south-1.amazonaws.com/prod";
axios.defaults.headers.common["Authorization"] =
  "Bearer " +
  "eyJraWQiOiJJNEF0czZvTEdRenlcL0JJM2NGeWtCZjlTMlZZVGRMSzVoeXZDck1sQnhtYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4Y2QzZGIzMi00MTg2LTRjMzYtODEwNC0wYTg2NTgwODdjMTQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xXzI4VEFIMWg3YyIsImNsaWVudF9pZCI6IjNpbWNiZjExYWdmYTg2bXQyMTZ1NWYzNGd0Iiwib3JpZ2luX2p0aSI6IjdmYTc0Y2U5LTk4ZGMtNGJkNC04ODVjLTUwOGVkMjRlOWNhZSIsImV2ZW50X2lkIjoiZmJhYjYwODctZTdmMC00YzEyLThjMDQtZmEyZjY0NmMyMjI4IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY4MzM5ODM3OSwiZXhwIjoxNjgzNDAxOTc5LCJpYXQiOjE2ODMzOTgzNzksImp0aSI6IjExNWMxOGJiLWNlNTYtNDkwYy1hNDA2LWJmYmQzMmMzMzc3MiIsInVzZXJuYW1lIjoic2Fua2V0MTIzIn0.DfFet1cZ9-rvXFmUf7e6RLWU0Gm5890EhgkICr9TMve8w0pNDssxGpyZIv__s7rNJFIORy7PgZH8V4dUifOHKJEea8pJD7matD7Qfx2ZGbRxjo2-m13OlOLR_I0N4xJ0QjJxyuhpGBz1VQmwC82I9IJ_kIc2UULeS2uNtg7kAmY_o6xG-kJirhMyCn46cSfrdmhiwwkKMceAnUS0b9q5V8GhlvGW3ZVlDYnX3f6OhrvV5Aa5iF-BcOsJIjnFp1P7622UAJkVWae5o5Wxfpt-K9MJPC-0qW2pkpTgUTt5RyLeueTLga2LuG6K1A7si2Kbi5vfccy06VOKU1ufwK01qw";

export const createSurveyApi = async (
  surveyHeader: SurveyHeader
): Promise<string> => {
  const response = await axios.post("create_survey_request", {
    survey_name: surveyHeader.name,
    survey_description: surveyHeader.description,
  });

  ////console.log(response);

  return response.data as string;
};

export const getAllSurveyApi =
  async (): Promise<Array<SurveyHeader> | null> => {
    const response = await axios.get("/get_my_surveys");

    ////console.log(response);

    if (response.data.status === 200) {
      return response.data.response
        .filter((r: { survey_name: string | null }) => r.survey_name)
        .map(
          (r: {
            survey_name: string | null;
            id: number;
            survey_update_date: string;
          }) => {
            return {
              id: r.id,
              name: r.survey_name,
              updatedDate: new Date(r.survey_update_date).toDateString(), //format(new Date(r.survey_update_date), "YYYY-MM-DD"),
            } as SurveyHeader;
          }
        ) as Array<SurveyHeader>;
    }

    return null;
  };

export const saveSurveyFormApi = async (
  surveyFrom: SurveyForm
): Promise<SurveyForm | null> => {
  const response = await axios.post("/save_survey_form", surveyFrom);

  if (response.data.status === 200) return surveyFrom;

  return null;
};
