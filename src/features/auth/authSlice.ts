import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { User } from "models";

export interface LoginPayLoad {
    username: string
    password: string
}

export interface AuthSlice {
    isLoggedIn: boolean
    logging? : boolean
    currentUser?: User
}
const initialState: AuthSlice = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayLoad>) {
            state.logging = true
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.isLoggedIn = true
            state.logging = false
            state.currentUser = action.payload
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false
        },

        logout(state) {
            state.isLoggedIn = false
            state.currentUser = undefined
        },
    }
})

//Action
export const authActions = authSlice.actions

//Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectIsLogIn = (state: RootState) => state.auth.logging

const authReducer = authSlice.reducer
export default authReducer