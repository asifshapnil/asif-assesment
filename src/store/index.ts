import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import employeesSlice from "./employees.slice";


export const store = configureStore({
  reducer: {
    employees: employeesSlice,
  },
  // middleware: (getDefaultMiddleware: () => any) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
