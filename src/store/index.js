import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./auth";
import userReducers from "./user";
import uiReducers from "./ui";

const dataStore = configureStore({
    reducer: {
        auth : authReducers,
        user : userReducers,
        ui : uiReducers,
    }
})

export default dataStore;