import { store } from "./state/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import CreateSurvey from "./pages/CreateSurvey";
import Layout from "./pages/Layout";
import CreateSurveyQuestion from "./pages/CreateSurveyQuestion";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/createsurvey",
    element: (
      <Layout>
        <CreateSurvey />
      </Layout>
    ),
  },
  {
    path: "/createsurveyquestion/:surveyName",
    element: (
      <Layout>
        <CreateSurveyQuestion />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
