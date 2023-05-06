import { Button } from "@mui/material";
import { SurveyHeader } from "../type/Survey";

interface Props {
  surveyHeader: SurveyHeader;
}

const SurveyGridItem = ({ surveyHeader }: Props) => {
  return (
    <div>
      {surveyHeader.name}
      <Button variant="contained">VIEW RESPONSE</Button>
    </div>
  );
};

export default SurveyGridItem;
