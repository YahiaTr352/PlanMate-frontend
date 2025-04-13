import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "cookie-universal";

const cookie = Cookie();
export const authUser = createAsyncThunk(
    "auth/authUser",
    async ({ form, endPoint }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/users/${endPoint}`, form);
            const token = res.data.token;
            const userId = res.data.newUser._id;
            
            cookie.set("token", token);
            cookie.set("userId", userId);
            
            return { user: res.data.newUser, token: token };
        } catch (error) {

            if (!error.response) {
                return rejectWithValue({ networkError: "Network error. Please check your connection." });
            }
            
            if (error.response.status === 400) {
                return rejectWithValue({ backendAuthErrors: error.response.data });
            }
            
            if (error.response.status === 500) {
                return rejectWithValue({ serverError: error.response.data });
            }
            
            return rejectWithValue({ unknownError: "Something went wrong, please try again." });
            
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        token: null,
        loading: false,
        backendAuthErrors : {},
        serverError: {},
        networkError : null
    },
    extraReducers: (builder) => {
        builder
            .addCase(authUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.loading = false;
                state.backendAuthErrors = action.payload.backendAuthErrors;
                state.serverError = action.payload.serverError;
                state.networkError = action.payload.networkError;
            });
    }
});

export default authSlice.reducer;

