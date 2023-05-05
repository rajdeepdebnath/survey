import { store } from "./state/store";
import { Provider } from "react-redux";
import Button from "@mui/material/Button";

function App() {
  return (
    <Provider store={store}>
      <Button variant="contained">Hello World</Button>
    </Provider>
  );
}

export default App;
