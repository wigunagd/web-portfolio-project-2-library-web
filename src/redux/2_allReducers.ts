import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./1_authSlice";
import { filterReducer } from "./1_filterSlice";

export const allReducers = combineReducers({
    auth: authReducer,
    filter: filterReducer
});