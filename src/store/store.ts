import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tracksReducer from "../slices/tracksSlice";
import searchReducer from "../slices/searchSlice";

const rootReducer = combineReducers({
    tracks: tracksReducer,
    search: searchReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;