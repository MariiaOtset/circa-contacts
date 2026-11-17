import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
const errorValue=e=>e.response?.data?.message||e.message||"An unexpected error occurred";
export const fetchContacts=createAsyncThunk("contacts/fetchAll",async(_,api)=>{
 try{const {data}=await axios.get("/contacts",{signal:api.signal});return data;}catch(e){return api.rejectWithValue(errorValue(e));}
});
export const addContact=createAsyncThunk("contacts/addContact",async(contact,api)=>{
 try{const {data}=await axios.post("/contacts",contact);return data;}catch(e){return api.rejectWithValue(errorValue(e));}
});
export const deleteContact=createAsyncThunk("contacts/deleteContact",async(id,api)=>{
 try{await axios.delete("/contacts/"+encodeURIComponent(id));return {id};}catch(e){return api.rejectWithValue(errorValue(e));}
});
export const updateContact=createAsyncThunk("contacts/update",async({id,name,number},api)=>{
 try{const {data}=await axios.patch("/contacts/"+encodeURIComponent(id),{name,number});return data;}catch(e){return api.rejectWithValue(errorValue(e));}
});
