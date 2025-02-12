import {createSlice} from "@reduxjs/toolkit";

const initialState={
    isAuthenticated:false,
    user:null,
    role:"user",
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.user=action.payload.user;
            state.role=action.payload.user.role;
        },
        logout:(state)=>{
            state.isAuthenticated=false;
            state.user=null;
            state.role="user";
        }
    }
})

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;