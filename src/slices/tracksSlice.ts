import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Track {
    _id: string;
    duration_ms: number;
    images: string;
    name: string;
    release_date: string;
    album: string;
    artists: string[];
    songType: string;
}

const initialState = {
    tracks: [] as Track[],
    status: 'idle'
};

export const getTracks = createAsyncThunk(
    'tracks/getTracks',
    async (search: string) => {
        const response = await axios.get(`http://localhost:5000/tracks/getTrack/${search}`);
        return response.data;
    }
);

const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        setTracks: (state, action) => {
            state.tracks = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTracks.pending, (state) => {
            state.status = 'loading';
        }).addCase(getTracks.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.tracks = action.payload;
        }).addCase(getTracks.rejected, (state) => {
            state.status = 'failed';
            state.tracks = [];
        });
    }
});

export const { setTracks } = tracksSlice.actions;
export default tracksSlice.reducer;