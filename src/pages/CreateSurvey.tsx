import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { createSurvey } from "../state/surveySlice";
import { SurveyHeader } from "../type/Survey";
import { RootState } from "../state/store";
import { API_STATUS } from "../type/baseType";
import { useNavigate } from "react-router-dom";
import randomstring from "randomstring";

const CreateSurvey = () => {
  const navigate = useNavigate();
  const [loading, error, createSurveyApiStatus] = useAppSelector(
    (state: RootState) => [
      state.survey.loading,
      state.survey.error,
      state.survey.createSurveyApiStatus,
    ]
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  const handleNext = () => {
    const uniqueName = `${name}-${randomstring.generate(7)}`;
    setName(uniqueName);
    dispatch(createSurvey({ name: uniqueName, description } as SurveyHeader));
  };

  useEffect(() => {
    if (createSurveyApiStatus === API_STATUS.FULLFILED) {
      navigate(`/createsurveyquestion/${name}`);
    }
  }, [createSurveyApiStatus]);

  return (
    <Box>
      <TextField
        label="Outlined"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Outlined"
        variant="outlined"
        multiline
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error ? error : null}
      <Button variant="contained" onClick={handleNext}>
        {loading ? <CircularProgress /> : "Next"}
      </Button>
    </Box>
  );
};

export default CreateSurvey;
