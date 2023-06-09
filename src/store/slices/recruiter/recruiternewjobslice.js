import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { newJobPost, updateJobPost } from "../../../service/recruiterService";

export const postNewJobAction = createAsyncThunk(
  "postNewJob",
  async (jobData) => {
    try {
      const recruiterId = localStorage.getItem("recruiterId");
      const newJobDataM = { ...jobData, recruiterId };
      const result = await newJobPost(newJobDataM);
      return result;
    } catch (error) {
      return error;
    }
  }
);

export const updateJobPostAction = createAsyncThunk(
  "updateJobAction",
  async (jobData) => {
    try {
      const recruiterId = localStorage.getItem("recruiterId");
      const newJobDataM = { ...jobData, recruiterId };
      console.log("newJobDataM", newJobDataM);
      const result = await updateJobPost(newJobDataM);
      return result;
    } catch (error) {
      return error;
    }
  }
);

const postNewJobSlice = createSlice({
  name: "postNewJobSlice",
  initialState: {
    loading: false,
    data: {},
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNewJobAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(postNewJobAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.error = null;
      })
      .addCase(postNewJobAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.data = {};
        state.error = payload;
      })
      .addCase(updateJobPostAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJobPostAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = { message: payload.message };
        state.error = null;
      })
      .addCase(updateJobPostAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.data = {
          message: "some error has occured, rejected update from server",
        };
        state.error = "error";
      });
  },
});

export default postNewJobSlice.reducer;
