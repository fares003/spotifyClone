import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import tracksReducer from "../slices/tracksSlice";
export const store=configureStore({
    reducer:{
        tracks:tracksReducer
    }
})

export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>