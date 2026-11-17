import {useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import toast from "react-hot-toast";
import {logOut} from "../../redux/auth/operations";
import {selectUser} from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";
export default function UserMenu(){
 const user=useSelector(selectUser),dispatch=useDispatch(),[busy,setBusy]=useState(false);
 const signOut=async()=>{setBusy(true);try{await dispatch(logOut()).unwrap();}catch{toast.error("Could not sign out. Please try again.");}finally{setBusy(false);}};
 return <div className={css.wrapper}><div className={css.avatar} aria-hidden="true">{user?.name?.trim()?.[0]?.toUpperCase()||"U"}</div><div className={css.user}><strong>{user?.name||"My account"}</strong><span>PERSONAL WORKSPACE</span></div><button className={css.button} type="button" disabled={busy} onClick={()=>void signOut()}>{busy?"Signing out…":"Log out"} <span aria-hidden="true">↗</span></button></div>;
}
