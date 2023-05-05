import { Survey } from "../type/Survey";

interface Props {
  survey: Survey;
}

const SurveyGridItem = ({ survey }: Props) => {
  return <div>{survey.surveyHeader?.name}</div>;
};

export default SurveyGridItem;
