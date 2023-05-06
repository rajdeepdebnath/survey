import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInApi } from "../api/userApi";
import { UserLogin } from "../type/userLogin";
import { API_STATUS } from "../type/baseType";

const initialState: UserLogin = {
  username: null,
  action: null,
  password: null,
  token: null,
  apiStatus: API_STATUS.IDLE,
  loading: false,
  error: null,
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const signin = createAsyncThunk(
  "userLogin",
  async (userLogin: UserLogin) => {
    const response = await signInApi(userLogin);
    return response;
  }
);

// Action creators are generated for each case reducer function
// export const {} = userLoginSlice.actions;

export default userLoginSlice.reducer;
