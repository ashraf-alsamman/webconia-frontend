import { configureStore } from "@reduxjs/toolkit";
import visitorsSlice from "./visitorsSlice";


export const store = configureStore({
  reducer: {
    visitorsSlice
  },
});

export default store;
