import {createSlice} from "@reduxjs/toolkit";
import {logIn,logOut,register,refreshUser} from "./operations";
const initialState={user:{name:null,email:null},token:null,isLoggedIn:false,isRefreshing:false,loading:false,error:null};
const setAuth=(state,{payload})=>{state.user=payload.user;state.token=payload.token;state.isLoggedIn=true;state.loading=false;state.error=null;};
const pending=state=>{state.loading=true;state.error=null;};
const rejected=(state,action)=>{state.loading=false;state.error=action.payload;};
const slice=createSlice({name:"auth",initialState,extraReducers:builder=>builder
 .addCase(register.pending,pending).addCase(register.fulfilled,setAuth).addCase(register.rejected,rejected)
 .addCase(logIn.pending,pending).addCase(logIn.fulfilled,setAuth).addCase(logIn.rejected,rejected)
 .addCase(logOut.pending,pending).addCase(logOut.fulfilled,state=>{state.user={name:null,email:null};state.token=null;state.isLoggedIn=false;state.loading=false;state.error=null;}).addCase(logOut.rejected,rejected)
 .addCase(refreshUser.pending,state=>{state.isRefreshing=true;state.error=null;})
 .addCase(refreshUser.fulfilled,(state,action)=>{state.user=action.payload;state.isLoggedIn=true;state.isRefreshing=false;state.error=null;})
 .addCase(refreshUser.rejected,(state,action)=>{state.isRefreshing=false;state.isLoggedIn=false;state.user={name:null,email:null};state.token=null;state.error=action.payload==="NO_TOKEN"?null:"Unable to restore your session";})
});
export const authReducer=slice.reducer;
