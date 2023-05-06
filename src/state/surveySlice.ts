import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Question, Survey, SurveyForm, SurveyHeader } from "../type/Survey";
import {
  createSurveyApi,
  getAllSurveyApi,
  saveSurveyFormApi,
} from "../api/surveyApi";
import { API_STATUS, BaseType } from "../type/baseType";

interface SurveyState extends BaseType {
  surveys: Array<Survey> | null;
  createSurveyApiStatus: API_STATUS;
  saveSurveyFormApiStatus: API_STATUS;
  currentSurvey?: Survey;
}

const initialState: SurveyState = {
  surveys: null,
  createSurveyApiStatus: API_STATUS.IDLE,
  saveSurveyFormApiStatus: API_STATUS.IDLE,
  currentSurvey: undefined,
  loading: false,
  error: null,
};

export const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setCurrentSurvey: (state, action: PayloadAction<string>) => {
      state.currentSurvey = state.surveys?.find(
        (s) => s.surveyHeader?.name === action.payload
      );
    },
    setNewQuestion: (state, action: PayloadAction<Question>) => {
      if (
        state.currentSurvey &&
        state.currentSurvey.surveyBody &&
        Array.isArray(state.currentSurvey.surveyBody)
      ) {
        state.currentSurvey.surveyBody.push(action.payload);
      } else if (state.currentSurvey && !state.currentSurvey.surveyBody) {
        state.currentSurvey.surveyBody = [
          { ...action.payload },
        ] as Array<Question>;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSurvey.pending, (state) => {
        state.loading = true;
        state.createSurveyApiStatus = API_STATUS.PENDING;
      })
      .addCase(createSurvey.fulfilled, (state) => {
        state.loading = false;
        state.createSurveyApiStatus = API_STATUS.FULLFILED;
      })
      .addCase(createSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.createSurveyApiStatus = API_STATUS.REJECTED;
      })
      .addCase(saveSurveyForm.pending, (state) => {
        state.loading = true;
        state.saveSurveyFormApiStatus = API_STATUS.PENDING;
      })
      .addCase(saveSurveyForm.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentSurvey && action.payload)
          state.currentSurvey.surveyBody = action.payload.survey_form;
        state.saveSurveyFormApiStatus = API_STATUS.FULLFILED;
      })
      .addCase(saveSurveyForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.saveSurveyFormApiStatus = API_STATUS.REJECTED;
      })
      .addCase(getCurrentSurvey.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentSurvey.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.currentSurvey = {
            surveyHeader: action.payload,
            surveyBody: undefined,
          } as Survey;
        }
      })
      .addCase(getCurrentSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllSurvey.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSurvey.fulfilled, (state, action) => {
        state.loading = false;

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

export const getCurrentSurvey = createAsyncThunk(
  "survey/getCurrentSurvey",
  async (name: string) => {
    const response = await getAllSurveyApi();
    return response?.find((e) => e.name === name);
  }
);

export const saveSurveyForm = createAsyncThunk(
  "survey/saveSurveyForm",
  async (surveyForm: SurveyForm) => {
    const response = await saveSurveyFormApi(surveyForm);
    return response;
  }
);

// Action creators are generated for each case reducer function
export const { setCurrentSurvey, setNewQuestion } = surveySlice.actions;

export default surveySlice.reducer;
