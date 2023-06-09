import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  approveApplicant as approveApplicantService,
  rejectApplicant as rejectApplicantService,
  applicantList,
} from "../../../service/recruiterService";

export const displayAllApplicantsAction = createAsyncThunk(
  "displayAllApplicantsAction",
  async (recruiter_id) => {
    try {
      const response = await applicantList(recruiter_id);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const approveApplicantAction = createAsyncThunk(
  "approveApplicantAction",
  async (applicant_id) => {
    try {
      const response = await approveApplicantService(applicant_id);
      return response.json();
    } catch (error) {
      throw error;
    }
  }
);

export const rejectApplicantAction = createAsyncThunk(
  "rejectApplicantAction",
  async (applicant_id) => {
    try {
      const response = await rejectApplicantService(applicant_id);
      return response.json();
    } catch (error) {
      throw error;
    }
  }
);

const displayAllApplicantsSlice = createSlice({
  name: "displayAllApplicantsSlice",
  initialState: {
    applicants: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(displayAllApplicantsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(displayAllApplicantsAction.fulfilled, (state, action) => {
        console.log("all applicants ", action.payload);
        state.loading = false;
        if (!action.payload.errorMessage) {
          state.applicants = action.payload;
          state.error = null;
        }
        if (action.payload.errorMessage) {
          console.log("payload error", action.payload.errorMessage);
          state.error = action.payload.errorMessage;
          state.applicants = [];
        }
      })
      .addCase(displayAllApplicantsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = "Some Problem Occured From Server Side";
      })
      .addCase(approveApplicantAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveApplicantAction.fulfilled, (state, action) => {
        const updatedApplicant = action.payload;
        const index = state.applicants.findIndex(
          (applicant) => applicant.id === updatedApplicant.id
        );
        state.applicants[index] = updatedApplicant;
        state.loading = false;
        state.error = null;
        toast.success("Applicant approved successfully!");
      })
      .addCase(approveApplicantAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`Error: ${action.error.message}`);
      })
      .addCase(rejectApplicantAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectApplicantAction.fulfilled, (state, action) => {
        const updatedApplicant = action.payload;
        const index = state.applicants.findIndex(
          (applicant) => applicant.id === updatedApplicant.id
        );
        state.applicants[index] = updatedApplicant;
        state.loading = false;
        state.error = null;
        toast.success("Applicant rejected successfully!");
      })
      .addCase(rejectApplicantAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`Error: ${action.error.message}`);
      });
  },
});

export default displayAllApplicantsSlice.reducer;
