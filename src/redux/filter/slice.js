import {createSlice} from "@reduxjs/toolkit";
const slice=createSlice({name:"filter",initialState:{name:"",number:""},reducers:{changeFilter(state,action){const query=String(action.payload||"");state.name=query;state.number=query;}}});
export const {changeFilter}=slice.actions;
export default slice.reducer;
