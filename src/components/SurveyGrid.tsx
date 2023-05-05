import { Survey } from "../type/Survey";

interface Props {
  surveys: Array<Survey> | null;
}

const SurveyGrid = ({ surveys }: Props) => {
  return (
    <>{surveys && surveys.map((s) => <div>{s.surveyHeader?.name}</div>)}</>
  );
};

export default SurveyGrid;
