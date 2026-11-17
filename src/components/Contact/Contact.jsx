import {useEffect,useState} from "react";
import {useDispatch} from "react-redux";
import toast from "react-hot-toast";
import {HiOutlinePencilSquare,HiOutlineTrash,HiOutlineStar,HiOutlinePhoneArrowUpRight,HiOutlineXMark} from "react-icons/hi2";
import {deleteContact} from "../../redux/contacts/operations";
import ContactForm from "../ContactForm/ContactForm";
import css from "./Contact.module.css";
const initial=name=>(name||"?").trim().split(/\s+/).slice(0,2).map(part=>part[0]).join("").toUpperCase();
const tones=["violet","peach","mint","sky","yellow","pink"];
export default function Contact({contact,starred,onToggleStar,group="",onGroupChange,compact=false}){
 const {id,name,number}=contact;
 const dispatch=useDispatch(),[dialog,setDialog]=useState(null),[busy,setBusy]=useState(false);
 const tone=tones[Array.from(String(id)).reduce((sum,char)=>sum+char.charCodeAt(0),0)%tones.length];
 useEffect(()=>{if(!dialog)return;const key=e=>{if(e.key==="Escape"&&!busy)setDialog(null);};window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key);},[dialog,busy]);
 const copy=async()=>{try{await navigator.clipboard.writeText(number);toast.success("Phone number copied");}catch{toast.error("Could not copy. Select the number instead.");}};
 const remove=async()=>{setBusy(true);try{await dispatch(deleteContact(id)).unwrap();toast.success("Contact removed");setDialog(null);}catch{toast.error("Could not delete contact");}finally{setBusy(false);}};
 return <article className={css.card+(compact?" "+css.compact:"")}>
   <div className={css.head}><span className={css.avatar+" "+css[tone]} aria-hidden="true">{initial(name)}</span></div>
   <div className={css.contactInfo}><h3 title={name}>{name}</h3><button type="button" className={css.star+(starred?" "+css.isStarred:"")} title={starred?"Remove favourite":"Add to favourites"} aria-label={starred?"Remove "+name+" from favourites":"Add "+name+" to favourites"} aria-pressed={starred} onClick={onToggleStar}><HiOutlineStar aria-hidden="true"/></button></div>
   <div className={css.phoneLine}><HiOutlinePhoneArrowUpRight aria-hidden="true"/><a href={"tel:"+number.replace(/[^+\d]/g,"")}>{number}</a><button type="button" className={css.copy} aria-label={"Copy phone number of "+name} title="Copy number" onClick={()=>void copy()}><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="8" y="7" width="11" height="13" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1"/></svg></button></div>
   <label className={css.groupLabel}><span className={css.groupCaption}>GROUP</span><select value={group} onChange={e=>onGroupChange?.(e.target.value)} aria-label={"Group for "+name}><option value="">Uncategorised</option>{["Friends","Family","Work","Other"].map(option=><option key={option} value={option}>{option}</option>)}</select></label>
   <div className={css.footer}><div><button type="button" title={"Edit "+name} aria-label={"Edit "+name} onClick={()=>setDialog("edit")}><HiOutlinePencilSquare/></button><button type="button" className={css.delete} aria-label={"Delete "+name} title={"Delete "+name} onClick={()=>setDialog("delete")}><HiOutlineTrash/></button></div></div>
   {dialog&&<div role="presentation" className={css.backdrop} onMouseDown={e=>{if(e.target===e.currentTarget&&!busy)setDialog(null);}}><div role="dialog" aria-modal="true" aria-label={dialog==="edit"?"Edit contact":"Delete contact"} className={css.modal}><div className={css.modalHead}><div><p className="c-eyebrow">{dialog==="edit"?"EDIT PERSON":"CONFIRM REMOVAL"}</p><h2 className="c-serif">{dialog==="edit"?"Update contact details":"Remove this contact?"}</h2></div><button type="button" aria-label="Close dialog" onClick={()=>setDialog(null)} disabled={busy}><HiOutlineXMark/></button></div>{dialog==="edit"?<ContactForm contact={contact} onClose={()=>setDialog(null)} onSuccess={()=>setDialog(null)}/>:<div className={css.confirm}><p>Are you sure you want to delete <strong>{name}</strong>? This removes the contact from your account and cannot be undone.</p><div><button type="button" onClick={()=>setDialog(null)} disabled={busy}>Keep contact</button><button type="button" className={css.danger} onClick={()=>void remove()} disabled={busy}>{busy?"Deleting…":"Delete contact"}</button></div></div>}</div></div>}
 </article>;
}
