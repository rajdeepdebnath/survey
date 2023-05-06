import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { createSurvey } from "../state/surveySlice";
import { SurveyHeader } from "../type/Survey";
import { RootState } from "../state/store";

const CreateSurvey = () => {
  const [loading, error] = useAppSelector((state: RootState) => [
    state.survey.loading,
    state.survey.error,
  ]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();

  const handleNext = () => {
    dispatch(createSurvey({ name, description } as SurveyHeader));
  };

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
      {loading ? "loading..." : null}
      {error ? error : null}
      <Button variant="contained" onClick={handleNext}>
        Next
      </Button>
    </Box>
  );
};

export default CreateSurvey;
