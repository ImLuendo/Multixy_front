import { configureStore } from "@reduxjs/toolkit";
import { signupReducer } from "./signupSlice/signupSlice";
import { loginReducer } from "./loginSlice";

export const multixy_store = configureStore({
    reducer: {
        SIGNUP: signupReducer,
        AUTH: loginReducer
        
    }
})