import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { employeesMasterData } from "../masterdata/employees.data";

const initialState: any = {
    employees: [],
    isLoading: false,
    error: null,
};

export const getEmployees: any = createAsyncThunk(
    "content/getEmployees",
    async () => {
        const res = await axios.get(`https://dummy.restapiexample.com/api/v1/employees`);
        const data = await res.data;
        return data;
    }
);

export const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        setEmployees: (state: any, action: any) => {
            state.employees = action.payload;
        },
    },
    extraReducers: (builder: any) => {
        builder.addCase(getEmployees.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(getEmployees.fulfilled, (state: any, action: any) => {
            state.isLoading = false;
            state.employees = action.payload.data;
        });
        builder.addCase(getEmployees.rejected, (state: any, action: any) => {
            state.employees = employeesMasterData;
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export const { setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
