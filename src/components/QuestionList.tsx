import Chip from "@mui/material/Chip";
import { Question } from "../type/Survey";

interface Props {
  questions: Array<Question>;
  handleEditQuestion: (question?: Question) => void;
  handleDeleteQuestion: (questions: Array<Question>) => void;
}
const QuestionList = ({
  questions,
  handleEditQuestion,
  handleDeleteQuestion,
}: Props) => {
  const handleClick = (questionText: string) => {
    handleEditQuestion(questions.find((q) => q.questionText === questionText));
  };
  const handleDelete = (questionText: string) => {
    handleDeleteQuestion(
      questions.filter((q) => q.questionText !== questionText)
    );
  };
  return (
    <div>
      {questions &&
        questions
          .filter((q) => q.questionText.trim().length > 0)
          .map((q, idx) => (
            <Chip
              key={idx}
              label={q.questionText}
              variant="outlined"
              onClick={handleClick.bind(this, q.questionText)}
              onDelete={handleDelete.bind(this, q.questionText)}
            />
          ))}
    </div>
  );
};

export default QuestionList;
