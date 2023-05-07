import Rating from "@mui/material/Rating";
import { QuestionType } from "../type/Survey";
import EmojiRating from "./EmojiRating";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import MCQ from "./MCQ";

interface Props {
  questionType: QuestionType;
}

const QuestionTypeDetails = ({ questionType }: Props) => {
  if (questionType === QuestionType.DESCRIPTIVE) {
    return null;
  }
  if (questionType === QuestionType.EMOJI_RATING) {
    return <EmojiRating />;
  }
  if (questionType === QuestionType.MCQ) {
    return <MCQ />;
  }
  if (questionType === QuestionType.NUMBER_RATING) {
    return (
      <Stack direction="row" spacing={1}>
        {Array(10)
          .fill("")
          .map((_, idx) => (
            <Box key={idx} sx={{ padding: 2, border: 1 }}>
              {idx + 1}
            </Box>
          ))}
      </Stack>
    );
  }
  if (questionType === QuestionType.SHORT_ANSWER) {
    return <div>{questionType}</div>;
  }
  if (questionType === QuestionType.SINGLE_CHOICE) {
    return <MCQ />;
  }
  if (questionType === QuestionType.STAR_RATING) {
    return <Rating name="read-only" value={5} readOnly size="large" />;
  }
  if (questionType === QuestionType.YES_NO) {
    return (
      <Stack direction="row" spacing={1}>
        <Box sx={{ padding: 2, border: 1 }}>
          <ThumbUpIcon sx={{ color: "#d3d3d3" }} />
        </Box>
        <Box sx={{ padding: 2, border: 1 }}>
          <ThumbDownIcon sx={{ color: "#d3d3d3" }} />
        </Box>
      </Stack>
    );
  }

  return <div></div>;
};

export default QuestionTypeDetails;
