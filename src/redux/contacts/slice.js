import {createSlice} from "@reduxjs/toolkit";
import {fetchContacts,addContact,deleteContact,updateContact} from "./operations";
import {logOut} from "../auth/operations";
const initialState={items:[],loading:false,error:null};
const pending=state=>{state.loading=true;state.error=null;};
const reject=(state,action)=>{state.loading=false;if(!action.meta.aborted)state.error=action.payload||"Something went wrong";};
const slice=createSlice({name:"contacts",initialState,extraReducers:builder=>builder
 .addCase(fetchContacts.pending,pending)
 .addCase(fetchContacts.fulfilled,(state,action)=>{state.loading=false;state.items=Array.isArray(action.payload)?action.payload:[];})
 .addCase(fetchContacts.rejected,reject)
 .addCase(addContact.pending,pending)
 .addCase(addContact.fulfilled,(state,action)=>{state.loading=false;state.items.push(action.payload);})
 .addCase(addContact.rejected,reject)
 .addCase(deleteContact.pending,pending)
 .addCase(deleteContact.fulfilled,(state,action)=>{state.loading=false;state.items=state.items.filter(x=>x.id!==action.payload.id);})
 .addCase(deleteContact.rejected,reject)
 .addCase(updateContact.pending,pending)
 .addCase(updateContact.fulfilled,(state,action)=>{state.loading=false;const index=state.items.findIndex(c=>c.id===action.payload.id);if(index!==-1)state.items[index]=action.payload;})
 .addCase(updateContact.rejected,reject)
 .addCase(logOut.fulfilled,()=>initialState)
});
export default slice.reducer;
