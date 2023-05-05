import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import SurveyGrid from "./SurveyGrid";
import { getAllSurvey } from "../state/surveySlice";

const SurveyView = () => {
  const surveys = useAppSelector((state: RootState) => state.survey.surveys);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllSurvey());
  }, []);

  return (
    <div>
      <SurveyGrid surveys={surveys} />
    </div>
  );
};

export default SurveyView;
