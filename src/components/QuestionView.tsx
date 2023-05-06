import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import { Question, QuestionType } from "../type/Survey";
import QuestionList from "./QuestionList";
import CreateQuestion from "./CreateQuestion";
import { saveSurveyForm, setNewQuestion } from "../state/surveySlice";

interface Props {
  currentQuestion: Question;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<Question>>;
}

const NEW_QUESTION: Question = {
  questionText: "",
  questionType: QuestionType.SINGLE_CHOICE as QuestionType,
  options: [""],
  isRequired: false,
};

const QuestionView = ({ currentQuestion, setCurrentQuestion }: Props) => {
  const dispatch = useAppDispatch();

  const currentSurvey = useAppSelector(
    (state: RootState) => state.survey.currentSurvey
  );

  useEffect(() => {
    if (currentQuestion) dispatch(setNewQuestion({ ...NEW_QUESTION }));
  }, [currentQuestion]);

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
      {currentSurvey && currentSurvey.surveyBody && (
        <>
          <CreateQuestion
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
          />
          <QuestionList
            questions={currentSurvey.surveyBody}
            handleEditQuestion={handleEditQuestion}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        </>
      )}
    </div>
  );
};

export default QuestionView;
