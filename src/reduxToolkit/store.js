import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from './slices/adminAuthSlice';
// Import other slices if needed

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    // Add other reducers here
  },
});

export default store;
