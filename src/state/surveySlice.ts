import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Survey, SurveyHeader } from "../type/Survey";
import { createSurveyApi, getAllSurveyApi } from "../api/surveyApi";
import { BaseType } from "../type/baseType";

interface SurveyState extends BaseType {
  surveys: Array<Survey> | null;
}

const initialState: SurveyState = {
  surveys: null,
  loading: false,
  error: null,
};

export const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSurvey.pending, (state) => {
        console.log("createSurvey");
        state.loading = true;
      })
      .addCase(createSurvey.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(createSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllSurvey.pending, (state) => {
        console.log("getAllSurvey");
        state.loading = true;
      })
      .addCase(getAllSurvey.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);

        state.surveys = action.payload?.map((e) => ({
          surveyHeader: e,
        })) as Array<Survey>;
      })
      .addCase(getAllSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const createSurvey = createAsyncThunk(
  "survey/createSurvey",
  async (surveyHeader: SurveyHeader) => {
    const response = await createSurveyApi(surveyHeader);
    return response;
  }
);

export const getAllSurvey = createAsyncThunk(
  "survey/getAllSurvey",
  async () => {
    const response = await getAllSurveyApi();
    return response;
  }
);

// Action creators are generated for each case reducer function
// export const {} = userLoginSlice.actions;

export default surveySlice.reducer;
