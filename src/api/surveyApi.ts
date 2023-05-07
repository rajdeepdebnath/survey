import axios from "axios";
import { SurveyForm, SurveyHeader } from "../type/Survey";

axios.defaults.baseURL =
  "https://izrmdya4vg.execute-api.ap-south-1.amazonaws.com/prod";
axios.defaults.headers.common["Authorization"] =
  "Bearer " +
  "eyJraWQiOiJJNEF0czZvTEdRenlcL0JJM2NGeWtCZjlTMlZZVGRMSzVoeXZDck1sQnhtYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4Y2QzZGIzMi00MTg2LTRjMzYtODEwNC0wYTg2NTgwODdjMTQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xXzI4VEFIMWg3YyIsImNsaWVudF9pZCI6IjNpbWNiZjExYWdmYTg2bXQyMTZ1NWYzNGd0Iiwib3JpZ2luX2p0aSI6ImFiOGZmNjEzLTRlZDQtNDY4ZS1iY2FmLTQ4Zjg2MDYyODM5MyIsImV2ZW50X2lkIjoiZGZmNzFkNzgtMGNmNC00YWQ3LTlkMzYtMzg5ZjcxZGU2MmY5IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY4MzQ5NTU2NiwiZXhwIjoxNjgzNDk5MTY2LCJpYXQiOjE2ODM0OTU1NjYsImp0aSI6IjhmYmExZDBkLTI2MDUtNDNhZS05NWEyLWIxMzk4MThlNGY4MCIsInVzZXJuYW1lIjoic2Fua2V0MTIzIn0.R2qKrkpj2-jKY5d4SS_yaukeCVCxEFGMqDacZHBYph9PTLiTDZuMRTbvsUyft8YX0hJ0v7C1S_IKcZxXRrmD93lueFVAC4_yPhQzS1AfRYrSJH457maEd136MvTEf7-w7_1uVs8WnVnKn84XVpGjRm2aWNqb8nf1RWpfIbQQiZzhIlfbxBAd_ns_GwZLZuifj6fhbQg1UmLRAjcPx1RTX1lqz7VQFBcy9zcd-sN_RCfmXj9OqHBu8kSeXKzOv6fKope4xkDbNKM_B-RB_DcVsdYb0G-o6S1h9v5DjE-xypCBHcxvvN0lBBsxdZxo7cWv1x3RdAld7NPBh9OxDsQ8mw";

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
