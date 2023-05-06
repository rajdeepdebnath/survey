import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const SurveyViewHeader = () => {
  const navigate = useNavigate();

  const handleCreateSurvey = () => {
    navigate("/createsurvey");
  };

  return (
    <div>
      Survey View Header
      <Button variant="contained" onClick={handleCreateSurvey}>
        CREATE SURVEY
      </Button>
    </div>
  );
};

export default SurveyViewHeader;
