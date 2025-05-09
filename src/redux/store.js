import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import tasksReducer from "./taskSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks : tasksReducer
    },
});

export default store;
