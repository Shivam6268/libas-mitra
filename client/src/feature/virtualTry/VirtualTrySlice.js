import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import virtualTryService from './VirtualTryService';

const initialState = {
    virtualTry: null,
    virtualTryLoading: false,
    virtualTrySuccess: false,
    virtualTryError: false,
    virtualTryErrorMessage: ""
}

const VirtualTrySlice = createSlice({
    name: "virtualTry",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
        .addCase(tryCloths.pending, (state, action) => {
            state.virtualTryLoading = true 
            state.virtualTrySuccess = false
            state.virtualTryError = false
        })
        .addCase(tryCloths.fulfilled, (state, action) => {
            state.virtualTryLoading = false 
            state.virtualTrySuccess = true
            state.virtualTryError = false
            state.virtualTry = action.payload
        })
        .addCase(tryCloths.rejected, (state, action) => {
            state.virtualTryLoading = false 
            state.virtualTrySuccess = false
            state.virtualTryError = true
            state.virtualTryErrorMessage = action.payload
        })
    }
});

export const { } = VirtualTrySlice.actions

export default VirtualTrySlice.reducer

export const tryCloths = createAsyncThunk("TRY/CLOTHS", async (formData, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await virtualTryService.tryClothsVirtualy(token, formData)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})