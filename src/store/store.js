import { configureStore } from "@reduxjs/toolkit";
import recruiterReducer from "./slices/recruiter/recruiterslice";
import jobseekerReducer from "./slices/jobseekerslice";
import jobserviceReducer from "./slices/jobserviceslice";
import searchserviceReducer from "./slices/searchserviceslice";
import newJobPostReducer from "./slices/recruiter/recruiternewjobslice";
import viewAllPostedJobsReducer from "./slices/recruiter/recruiterViewAllPostedJobsSlice";
import applicantReducer from "./slices/recruiter/applicantsSlice";

export const store = configureStore({
  reducer: {
    recruiterApp: recruiterReducer,
    jobseekerApp: jobseekerReducer,
    jobserviceApp: jobserviceReducer,
    searchserviceApp: searchserviceReducer,
    newJobPostApp: newJobPostReducer,
    viewAllPostedJobsApp: viewAllPostedJobsReducer,
    applicantsApp: applicantReducer,
  },
});
