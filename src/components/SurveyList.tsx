import { Survey } from "../type/Survey";
import SurveyGridItem from "./SurveyGridItem";

interface Props {
  surveys: Array<Survey> | null;
}

const SurveyList = ({ surveys }: Props) => {
  return (
    <>
      {surveys &&
        surveys.map(
          (s) =>
            s.surveyHeader && (
              <SurveyGridItem
                key={s.surveyHeader.id}
                surveyHeader={s.surveyHeader}
              />
            )
        )}
    </>
  );
};

export default SurveyList;
