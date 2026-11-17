import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL="https://connections-api.goit.global";
const setAuthHeader=token=>{axios.defaults.headers.common.Authorization="Bearer "+token;};
const clearAuthHeader=()=>{delete axios.defaults.headers.common.Authorization;};
const reject=(error,thunkAPI)=>thunkAPI.rejectWithValue(error.response?.status||error.message||"Network request failed");
export const register=createAsyncThunk("auth/register",async(newUser,thunkAPI)=>{
 try{const {data}=await axios.post("/users/signup",newUser);setAuthHeader(data.token);return data;}catch(error){return reject(error,thunkAPI);}
});
export const logIn=createAsyncThunk("auth/login",async(values,thunkAPI)=>{
 try{const {data}=await axios.post("/users/login",values);setAuthHeader(data.token);return data;}catch(error){return reject(error,thunkAPI);}
});
export const logOut=createAsyncThunk("auth/logout",async(_,thunkAPI)=>{
 try{await axios.post("/users/logout");clearAuthHeader();}catch(error){return reject(error,thunkAPI);}
});
export const refreshUser=createAsyncThunk("auth/refresh",async(_,thunkAPI)=>{
 const token=thunkAPI.getState().auth.token;
 if(!token)return thunkAPI.rejectWithValue("NO_TOKEN");
 try{setAuthHeader(token);const {data}=await axios.get("/users/current");return data;}catch(error){clearAuthHeader();return reject(error,thunkAPI);}
});
