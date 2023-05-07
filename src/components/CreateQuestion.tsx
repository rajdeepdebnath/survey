import { useEffect, useState } from "react";
import { QuestionType } from "../type/Survey";
import TextField from "@mui/material/TextField";
import { MenuItem, Select, Switch } from "@mui/material";
import { $enum } from "ts-enum-util";
import QuestionTypeDetails from "./QuestionTypeDetails";
import { useContext } from "react";
import { QuestionContext } from "../state/QuestionContext";

const CreateQuestion = () => {
  const { currentQuestion, setCurrentQuestion } = useContext(QuestionContext);
  const [questionText, setText] = useState(currentQuestion.questionText);
  const [isRequired, setIsRequired] = useState(currentQuestion.isRequired);
  const [questionType, setQuestionType] = useState(
    currentQuestion.questionType
  );

  useEffect(() => {
    setCurrentQuestion({ questionText, questionType, isRequired });
  }, [questionText, isRequired, questionType]);

  useEffect(() => {
    setText(currentQuestion.questionText);
    setIsRequired(currentQuestion.isRequired);
    setQuestionType(currentQuestion.questionType);
  }, [currentQuestion]);

  return (
    <div>
      <TextField
        label="Question Text"
        variant="outlined"
        value={questionText}
        onChange={(e) => setText(e.target.value)}
      />
      <Switch
        checked={isRequired}
        onChange={(e) => setIsRequired(e.target.checked)}
        size="small"
      />
      <Select
        value={questionType}
        label="Question Type"
        onChange={(e) => setQuestionType(e.target.value as QuestionType)}
      >
        {$enum(QuestionType)
          .getKeys()
          .map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
      </Select>
      <QuestionTypeDetails questionType={questionType} />
    </div>
  );
};

export default CreateQuestion;
