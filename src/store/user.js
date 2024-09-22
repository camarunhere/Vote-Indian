import { createSlice } from "@reduxjs/toolkit"

const usersInitialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
    signupValidations : {
        passwordsEquality : true,
        emailDuplicate : false
    },
    loginValidations : {
        isUserFound : true,
        isPwdCorrect: true
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: usersInitialState,
    reducers: {
        setCurrentUser(state, action){
            state.currentUser = action.payload.user
        },
        setPasswordsAreNotEqual(state){
            state.signupValidations.passwordsEquality = false
        },
        setEmailIsNotDuplicate(state){
            state.signupValidations.emailDuplicate = false
        },
        setPasswordsAreEqual(state){
            state.signupValidations.passwordsEquality = true
        },
        setEmailIsDuplicate(state){
            state.signupValidations.emailDuplicate = true
        },
        
        setNoUserFound(state){
            state.loginValidations.isUserFound = false
        },
        setWrongPassword(state){
            state.loginValidations.isPwdCorrect = false
        },
        setUserFound(state){
            state.loginValidations.isUserFound = true
        },
        setPasswordCorrect(state){
            state.loginValidations.isPwdCorrect = true
        }
    }
})

const userReducers = userSlice.reducer;
export const userActions = userSlice.actions;

export default userReducers;