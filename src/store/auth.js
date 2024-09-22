import { createSlice } from "@reduxjs/toolkit"
import { getLocalStorageToken } from "../util/local_storage"

const authInitialState = {
    // token: null,
    isAuthenticated: Boolean(localStorage.getItem('token'))
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        // getSetUserToken(state){
        //     state.token = getLocalStorageToken();
        //     console.log(state.token, 'token from authSliece reducer')
        // },
        onLogin(state){
            state.isAuthenticated = true
        },
        onLogout(state){
            state.isAuthenticated = false
        }
    }
})

const authReducers = authSlice.reducer;
export const authActions = authSlice.actions;

export default authReducers;