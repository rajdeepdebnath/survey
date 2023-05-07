import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import { Question } from "../type/Survey";
import QuestionList from "./QuestionList";
import CreateQuestion from "./CreateQuestion";
import { saveSurveyForm } from "../state/surveySlice";
import { useContext } from "react";
import { QuestionContext } from "../state/QuestionContext";

const QuestionView = () => {
  const { currentQuestion, setCurrentQuestion } = useContext(QuestionContext);
  const dispatch = useAppDispatch();

  const currentSurvey = useAppSelector(
    (state: RootState) => state.survey.currentSurvey
  );

  const handleEditQuestion = (question?: Question) => {
    console.log(question);
    if (question) setCurrentQuestion(question);
  };

  const handleDeleteQuestion = (questions: Array<Question>) => {
    console.log(questions);
    if (
      questions &&
      currentSurvey &&
      currentSurvey.surveyHeader &&
      currentSurvey.surveyHeader.id
    ) {
      dispatch(
        saveSurveyForm({
          survey_form: questions,
          row_id: currentSurvey.surveyHeader.id,
        })
      );
    }
  };

  return (
    <div>
      {currentSurvey && currentQuestion && <CreateQuestion />}
      {currentSurvey && currentSurvey.surveyBody && (
        <QuestionList
          questions={currentSurvey.surveyBody}
          handleEditQuestion={handleEditQuestion}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      )}
    </div>
  );
};

export default QuestionView;
