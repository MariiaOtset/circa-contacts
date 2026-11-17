import {createSelector} from "@reduxjs/toolkit";
import {selectNameFilter} from "../filter/selectors";
export const selectContacts=state=>state.contacts.items;
export const selectLoading=state=>state.contacts.loading;
export const selectError=state=>state.contacts.error;
export const selectEditing=()=>false;
export const selectFilteredContacts=createSelector([selectContacts,selectNameFilter],(contacts,search)=>{
 const needle=(search||"").trim().toLowerCase();
 if(!needle)return contacts;
 return contacts.filter(contact=>String(contact.name||"").toLowerCase().includes(needle)||String(contact.number||"").toLowerCase().includes(needle));
});
