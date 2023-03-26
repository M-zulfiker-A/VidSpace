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
        },
        unsubscription : (state, action)=>{
            if(state.currentUser.SubscribedUsers?.includes(action.payload)){
                state.currentUser.SubscribedUsers.splice(state.currentUser.SubscribedUsers.findIndex(channelId => channelId === action.payload))
            }
        },
        subscription : (state, action)=>{
            if(!state.currentUser.SubscribedUsers?.includes(action.payload)){
                state.currentUser.SubscribedUsers.push(action.payload)
            }
        }
    }
})

export const {loginFailure , loginStart , loginSuccess , logOut , subscription , unsubscription} = userSlice.actions

export default userSlice.reducer