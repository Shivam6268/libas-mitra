import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const existUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: existUser || null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state, action) => {
            state.pending = true
            state.isSuccess = false
            state.isError = false
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.pending = false
            state.isSuccess = true
            state.isError = false
            state.user = action.payload
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.pending = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(loginUser.pending, (state, action) => {
            state.pending = true
            state.isSuccess = false
            state.isError = false
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.pending = false
            state.isSuccess = true
            state.isError = false
            state.user = action.payload
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.pending = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(logoutUser.fulfilled, (state, action) => {
            state.pending = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
            state.user = null
          })
    }
})

export default authSlice.reducer

// FOR REGISTER


export const registerUser = createAsyncThunk("AUTH/REGISTER", async (formData, thunkAPI) => {
    try {
        return await authService.register(formData)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})

// FOR LOGIN
export const loginUser = createAsyncThunk("AUTH/LOGIN", async (formData, thunkAPI) => {
    try {
      return await authService.login(formData)
    } catch (error) {
      let message = error.response.data.message
      return thunkAPI.rejectWithValue(message)
    }
})


// FOR LOGOUT
export const logoutUser = createAsyncThunk("AUTH/LOGOUT", async () => {
    localStorage.removeItem("user")
})