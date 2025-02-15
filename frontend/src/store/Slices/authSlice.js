import {createSlice} from "@reduxjs/toolkit";

const initialState={
    isAuthenticated:false,
    user:null,
    role:"user",
    avatar:null,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.user=action.payload.user;
            state.role=action.payload.user.role;
            state.avatar=action.payload.user.avatar;
        },
        logout:(state)=>{
            state.isAuthenticated=false;
            state.user=null;
            state.role="user";
            state.avatar=null;
        }
    }
})

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;