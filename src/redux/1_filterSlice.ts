import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FilterState } from "./0_filterType";

const initialState: FilterState = {
    category: [],
    rating: []
}

export const filterSlice = createSlice({
    name: 'filter/slice',
    initialState: initialState,
    reducers: {
        setFilterReducer: (state, action: PayloadAction<{ category: number[]; rating: number[] }>) => {
            state.category = action.payload.category;
            state.rating = action.payload.rating;
        },
        clearFilter: (state) => {
            state.category = initialState.category;
            state.rating = initialState.rating;
        }
    }
});

export const { setFilterReducer, clearFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;