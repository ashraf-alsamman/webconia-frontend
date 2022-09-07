// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { config } from "../config/config";
import axios from 'axios';
const initialState = {
    data: {},
    status: 'loading',
    error: null,
}

export const visitors = createAsyncThunk('visitors', async () => {
    const response = await axios.get(config.api+'/api/visitors')
        .catch(error => error);
    return response.data;
})

const visitorsSlice = createSlice({
    name: 'visitorsSlice',
    initialState,
    reducers: {

    },

    extraReducers: {
        [visitors.pending]: (state, action) => {
            state.status = 'loading'
        },
        [visitors.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload;
        },
        [visitors.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        }
    }
})


export const visitorsReducer = visitorsSlice.reducer
export default visitorsSlice.reducer;