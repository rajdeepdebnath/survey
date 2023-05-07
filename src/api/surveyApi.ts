import axios from "axios";
import { SurveyForm, SurveyHeader } from "../type/Survey";

axios.defaults.baseURL =
  "https://izrmdya4vg.execute-api.ap-south-1.amazonaws.com/prod";
axios.defaults.headers.common["Authorization"] =
  "Bearer " +
  "eyJraWQiOiJJNEF0czZvTEdRenlcL0JJM2NGeWtCZjlTMlZZVGRMSzVoeXZDck1sQnhtYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4Y2QzZGIzMi00MTg2LTRjMzYtODEwNC0wYTg2NTgwODdjMTQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xXzI4VEFIMWg3YyIsImNsaWVudF9pZCI6IjNpbWNiZjExYWdmYTg2bXQyMTZ1NWYzNGd0Iiwib3JpZ2luX2p0aSI6IjM2ODAxMjI3LTAxMTktNGM2Mi1hMjRiLTliNzIyN2E5MWFjNSIsImV2ZW50X2lkIjoiYWRhY2M5YmMtNGI4YS00MDQzLTliYzgtZWIyYzJhZTVlYWI4IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY4MzQ0NDI1MCwiZXhwIjoxNjgzNDQ3ODUwLCJpYXQiOjE2ODM0NDQyNTAsImp0aSI6IjAzOGI0ODUwLWEyMzAtNGZmYi05MGYyLTRiZWIzNTk1MTYyZSIsInVzZXJuYW1lIjoic2Fua2V0MTIzIn0.IyaigL0jRbuCzOr1rSkT0v9xOCZlfFU6EEicFU_tL11mY-lma-XiDjQHmtvvmCH7iHyylkDupq5-oCb_sWiUoHkc_scW8e7GlKt3AvaGIog9Pag2LVzVEBiRB829mxWJoHMqf49NLKhHBMewma-K_Q14O3qWWBaEeUtTUe-4joIM62kOjaCDN09U-mqBaK7hSKJMenrEQLdy-oQpM9qqNBDfsUjIBi8XHEVWgyARA-Iyg5ykbW6evu8mQqnTynqRqUNM-Jb74cMGiINtA1pNZ7S0hk16rtKBqm53kJE4693BA5pmGDuycPECbAWU7DmFCu6Fu97CygIRrGCZ32JvDw";

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
