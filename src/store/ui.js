import { createSlice } from "@reduxjs/toolkit"

const uiInitialState = {
    flash : {
        isVisible : false,
        type: '',
        message: ''
    },
    loader : {
        isLoading : false,
    }
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: uiInitialState,
    reducers: {
        // onFlash(state){
        //     state.flash.isVisible = true
        // },
        // offFlash(state){
        //     state.flash.isVisible = false
        // },
        // toggleFlash(state){
        //     state.flash.isVisible = !state.flash.isVisible
        // },
        writeFlash(state, action){
            state.flash.isVisible = true
            state.flash.type = action.payload.type
            state.flash.message = action.payload.message
        },
        removeFlash(state){
            state.flash.isVisible = false
            state.flash.type = ''
            state.flash.message = ''
        },
        startLoading(state){
            state.loader.isLoading = true
        },
        stopLoading(state){
            state.loader.isLoading = false
        }
    }
})

const uiReducers = uiSlice.reducer;
export const uiActions = uiSlice.actions;

export default uiReducers;