import { RootState } from "../state/store";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useEffect, useState } from "react";
import {
  getCurrentSurvey,
  resetSaveSurveyFormApiStatus,
  saveSurveyForm,
} from "../state/surveySlice";
import Button from "@mui/material/Button";
import QuestionView from "../components/QuestionView";
import { useParams } from "react-router-dom";
import { Question, QuestionType } from "../type/Survey";
import { API_STATUS } from "../type/baseType";

const NEW_QUESTION: Question = {
  questionText: "",
  questionType: QuestionType.SINGLE_CHOICE as QuestionType,
  options: [""],
  isRequired: false,
};

const CreateSurveyQuestion = () => {
  const { surveyName } = useParams();
  const dispatch = useAppDispatch();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>({
    ...NEW_QUESTION,
  });

  const { currentSurvey, saveSurveyFormApiStatus } = useAppSelector(
    (state: RootState) => ({
      ...state.survey,
    })
  );

  useEffect(() => {
    if (surveyName && !currentSurvey) dispatch(getCurrentSurvey(surveyName));
  }, [surveyName]);

  const handleAddNewQuestion = () => {
    if (
      currentSurvey &&
      currentSurvey.surveyHeader &&
      currentSurvey.surveyHeader.id &&
      currentQuestion &&
      currentQuestion.questionText.trim().length > 0
    ) {
      dispatch(
        saveSurveyForm({
          survey_form: currentSurvey.surveyBody
            ? [...currentSurvey.surveyBody, currentQuestion]
            : [currentQuestion],
          row_id: currentSurvey.surveyHeader.id,
        })
      );
    }
  };

  useEffect(() => {
    if (saveSurveyFormApiStatus === API_STATUS.FULLFILED) {
      alert("Question saved successfully");
      setCurrentQuestion({ ...NEW_QUESTION });
      dispatch(resetSaveSurveyFormApiStatus());
    }
  }, [saveSurveyFormApiStatus]);

  return (
    <div>
      Create Question {currentSurvey?.surveyHeader?.id} -{" "}
      {currentSurvey?.surveyHeader?.name}
      {currentSurvey && (
        <QuestionView
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      )}
      <Button variant="contained" onClick={handleAddNewQuestion}>
        Add new question
      </Button>
    </div>
  );
};

export default CreateSurveyQuestion;
