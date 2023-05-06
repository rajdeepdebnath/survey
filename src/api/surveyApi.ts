import axios from "axios";
import { SurveyBody, SurveyHeader } from "../type/Survey";

axios.defaults.baseURL =
  "https://izrmdya4vg.execute-api.ap-south-1.amazonaws.com/prod";
axios.defaults.headers.common["Authorization"] =
  "Bearer " +
  "eyJraWQiOiJJNEF0czZvTEdRenlcL0JJM2NGeWtCZjlTMlZZVGRMSzVoeXZDck1sQnhtYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4Y2QzZGIzMi00MTg2LTRjMzYtODEwNC0wYTg2NTgwODdjMTQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xXzI4VEFIMWg3YyIsImNsaWVudF9pZCI6IjNpbWNiZjExYWdmYTg2bXQyMTZ1NWYzNGd0Iiwib3JpZ2luX2p0aSI6IjdkZDVlM2FiLTZhZWItNGEyNC1hYzA1LWM3M2IyYjMwMjBiNSIsImV2ZW50X2lkIjoiZWIxMzIzYmMtMTI3NC00MzJiLTk3ZTAtN2JjYzJhYjg5YzY0IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY4MzM2NDMxOCwiZXhwIjoxNjgzMzY3OTE4LCJpYXQiOjE2ODMzNjQzMTgsImp0aSI6ImI3ZDg5ZjliLTgwM2MtNGZlZC04MmIzLWI0NzBlYTJkMWE0MyIsInVzZXJuYW1lIjoic2Fua2V0MTIzIn0.oiZQ_MnrBpuJ3uitbpn9cRv6Wh-oP6L6LfRZSn_2wWhFKuHz6s8Y54JdZVOE8hq9jH6EjvUneAZGwVwfNUc1ZLCDIQsfcCUWeZ-O2ZwuULL2Jaq6kIz_wsMLSe120t64tqddW1b8xjZSfPHV_qA7NCUIPoDpM1ja7D1mrS8-XsF5LlO6RYymy6l3byi3-rFFRK5w4GMhaFfJ0g9NUySNiqNVBrSRZnXLbnUvKCuNQVlPZU5c6qpIk9frjTkUy9zMtD9FyXPs0_nyP_agZzNYcxOGi0dtXr5h41D2lTtBIODt0yNhE_PUmVrR_rR5fGjhDs9YekwCoqv8xUgBnRELxw";

export const createSurveyApi = async (
  surveyHeader: SurveyHeader
): Promise<string> => {
  const response = await axios.post("create_survey_request", {
    survey_name: surveyHeader.name,
    survey_description: surveyHeader.description,
  });

  console.log(response);

  return response.data as string;
};

export const getAllSurveyApi =
  async (): Promise<Array<SurveyHeader> | null> => {
    const response = await axios.get("/get_my_surveys");

    console.log(response);

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
  survey: SurveyBody
): Promise<string> => {
  const response = await axios.post("/save_survey_form", survey);

  console.log(response);

  return response.data.message as string;
};
