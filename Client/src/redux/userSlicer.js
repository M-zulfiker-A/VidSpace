import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    currentUser : null,
    loading : false,
    error : false
}

export const userSlice =createSlice({
    name : 'user',
    initialState,
    reducers : {
        loginStart : (state) =>{
            state.loading = true
        },
        loginSuccess : (state, action)=>{
            state.loading  = false
            state.currentUser = action.payload
        },
        loginFailure: (state)=>{
            state.error = true
            state.loading = false
        },
        logOut: (state)=>{
            state.error = false
            state.loading = false
            state.currentUser = null
        }
    }
})

export const {loginFailure , loginStart , loginSuccess , logOut} = userSlice.actions

export default userSlice.reducer