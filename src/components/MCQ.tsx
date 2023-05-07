import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

interface Ops {
  id: number;
  value: string;
}
const MCQ = () => {
  const [options, setOptions] = useState<Ops[]>([]);

  const handleAddOption = () => {
    setOptions((ops) => [...ops, { id: ops.length + 1, value: "" }]);
  };
  const handleSetOptions = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const otheOps = options.filter((o) => o.id !== id);
    setOptions([...otheOps, { id, value: e.target.value }]);
  };

  return (
    <>
      <Grid container>
        {options.map(({ id, value }) => (
          <Grid key={id} item xs={6}>
            <TextField
              label="Question Text"
              variant="outlined"
              value={value}
              onChange={handleSetOptions.bind(null, id)}
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={handleAddOption}>
        Add Option
      </Button>
    </>
  );
};

export default MCQ;
