import axios from "axios";
import { SurveyBody, SurveyHeader } from "../type/Survey";
import { format } from "date-fns";

const BASE_URL = "https://izrmdya4vg.execute-api.ap-south-1.amazonaws.com/prod";

export const createSurveyApi = async (
  surveyHeader: SurveyHeader
): Promise<string> => {
  const response = await axios.post(
    `${BASE_URL}/create_survey_request`,
    surveyHeader
  );

  console.log(response);

  return response.data as string;
};

export const getAllSurveyApi =
  async (): Promise<Array<SurveyHeader> | null> => {
    const response = await axios.get(`${BASE_URL}/get_my_surveys`, {
      headers: {
        Authorization:
          "Bearer " +
          "eyJraWQiOiJJNEF0czZvTEdRenlcL0JJM2NGeWtCZjlTMlZZVGRMSzVoeXZDck1sQnhtYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4Y2QzZGIzMi00MTg2LTRjMzYtODEwNC0wYTg2NTgwODdjMTQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xXzI4VEFIMWg3YyIsImNsaWVudF9pZCI6IjNpbWNiZjExYWdmYTg2bXQyMTZ1NWYzNGd0Iiwib3JpZ2luX2p0aSI6ImQ5NjQ4MTc2LWM1NmItNGRlNy1iYmRmLTA0OTgyOGUwNmYzMyIsImV2ZW50X2lkIjoiMWUyYTQxODAtNTgyNi00MjhmLTk5ODEtMGM1NDdhYWM3MjJiIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY4MzMyNTg1MywiZXhwIjoxNjgzMzI5NDUzLCJpYXQiOjE2ODMzMjU4NTMsImp0aSI6IjAwYmUwNTNkLTljODgtNDhhNC05OTFmLTExZWY4N2I0MDE1NCIsInVzZXJuYW1lIjoic2Fua2V0MTIzIn0.jKEsUjympl6Ql_gml5QD78h3yybxIpOAKZau2uRaOTRc4k53iNlG9rwEN-nyFoJky41tIk26ux4hB6YFS65poavLmw8SJDx0mIh-39eV31s_2Br77hunov2lK1LuzB78gLOOtunP-vxk1AO5PxM_-6SSVI47G9hbS2ZhW4rs6ov0NciusUi9hqR1XeeIAYNZsq976paY0prw-5jpjr0jwr6u3CWtG57Y45JOQj2d19vPZ31v8IP6hWDdWMBuLBXK3p7_7CpzzMFbDnWNf8SxjEpxmOF2LYar3KipS4ihYgpibrXqo982I_R9JhqaffeDHWnoDeOGxvmoNM8WYPhbeg",
      },
    });

    if (response.data.status === 200) {
      return response.data.response
        .filter((r: { survey_name: any }) => r.survey_name)
        .map(
          (r: {
            survey_name: string | null;
            id: number;
            survey_update_date: string;
          }) => {
            if (r.survey_name)
              return {
                id: r.id,
                name: r.survey_name,
                updatedDate: format(
                  new Date(r.survey_update_date),
                  "YYYY-MM-DD"
                ),
              } as SurveyHeader;
          }
        ) as Array<SurveyHeader>;
    }

    return null;
  };

export const saveSurveyFormApi = async (
  survey: SurveyBody
): Promise<string> => {
  const response = await axios.post(`${BASE_URL}/save_survey_form`, survey);

  console.log(response);

  return response.data.message as string;
};
