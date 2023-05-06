import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import SurveyGrid from "./SurveyGrid";
import { getAllSurvey } from "../state/surveySlice";
import Grid from "@mui/material/Grid";
import SurveyViewHeader from "./SurveyViewHeader";

const SurveyView = () => {
  const surveys = useAppSelector((state: RootState) => state.survey.surveys);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllSurvey());
  }, []);

  return (
    <Grid container>
      <Grid item md={12}>
        <SurveyViewHeader />
      </Grid>
      <Grid item md={12}>
        <SurveyGrid surveys={surveys} />
      </Grid>
    </Grid>
  );
};

export default SurveyView;
