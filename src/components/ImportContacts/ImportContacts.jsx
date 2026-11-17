import {useEffect,useRef,useState} from "react";
import {useDispatch} from "react-redux";
import toast from "react-hot-toast";
import {HiOutlineArrowUpTray,HiOutlineDocumentText,HiOutlineXMark} from "react-icons/hi2";
import {addContact} from "../../redux/contacts/operations";
import css from "./ImportContacts.module.css";
const normalizeNumber=value=>String(value||"").replace(/[^+\d]/g,"");
const validPhone=value=>/^[+\d()\s.-]+$/.test(value)&&/\d/.test(value)&&/^\+?\d+$/.test(normalizeNumber(value))&&value.replace(/\D/g,"").length>=7&&value.replace(/\D/g,"").length<=20;
const identity=(name,number)=>name.trim().toLocaleLowerCase()+"|"+normalizeNumber(number);
function parseCsv(text){
 const rows=[];let row=[],cell="",quoted=false;
 const input=text.replace(/^\uFEFF/,"");
 for(let i=0;i<input.length;i++){
  const ch=input[i];
  if(ch==='"'){if(quoted&&input[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}
  else if(ch===","&&!quoted){row.push(cell);cell="";}
  else if((ch==="\n"||ch==="\r")&&!quoted){row.push(cell);if(row.some(v=>v.trim()))rows.push(row);row=[];cell="";if(ch==="\r"&&input[i+1]==="\n")i++;}
  else cell+=ch;
 }
 if(quoted)throw new Error("An unfinished quoted value was found. Please check the CSV file.");
 row.push(cell);if(row.some(v=>v.trim()))rows.push(row);
 if(!rows.length)throw new Error("This CSV file is empty.");
 const headers=rows[0].map(value=>value.trim().toLowerCase().replace(/\s+/g," "));
 const n=headers.findIndex(h=>["name","full name","contact name"].includes(h)),p=headers.findIndex(h=>["phone","phone number","number","telephone","mobile"].includes(h));
 if(n<0||p<0)throw new Error("CSV columns must include Name and Phone number, like the CIRCA export.");
 return rows.slice(1).map(row=>({name:(row[n]||"").trim().replace(/\s+/g," "),number:(row[p]||"").trim()}));
}
export default function ImportContacts({existing,onClose}){
 const dispatch=useDispatch(),fileRef=useRef(null);
 const [name,setName]=useState(""),[rows,setRows]=useState([]),[skipped,setSkipped]=useState(0),[error,setError]=useState(""),[importing,setImporting]=useState(false),[progress,setProgress]=useState(0);
 useEffect(()=>{const handle=e=>{if(e.key==="Escape"&&!importing)onClose();};document.addEventListener("keydown",handle);return()=>document.removeEventListener("keydown",handle);},[onClose,importing]);
 const choose=async event=>{
  const file=event.target.files?.[0];if(!file)return;
  setRows([]);setSkipped(0);setError("");setProgress(0);setName(file.name);
  if(file.size>128000){setError("Choose a CSV under 128 KB. Import in smaller batches for large address books.");return;}
  try{
   const parsed=parseCsv(await file.text());
   if(parsed.length>200){setError("This file has more than 200 contacts. Split it into smaller files before importing.");return;}
   const known=new Set(existing.map(contact=>identity(contact.name||"",contact.number||"")));
   const unique=[];let invalid=0;
   parsed.forEach(contact=>{
    const id=identity(contact.name,contact.number);
    if(contact.name.length<2||contact.name.length>60||!validPhone(contact.number)||known.has(id)){invalid++;return;}
    known.add(id);unique.push(contact);
   });
   setRows(unique);setSkipped(invalid);
  }catch(err){setError(err.message||"Could not read this CSV file.");}
 };
 const submit=async()=>{
  if(!rows.length||importing)return;
  setImporting(true);setError("");let added=0;const failures=[];
  for(const contact of rows){
   try{await dispatch(addContact(contact)).unwrap();added++;}catch{failures.push(contact);}
   setProgress(added+failures.length);
  }
  setImporting(false);
  if(added)toast.success(added+" contact"+(added===1?"":"s")+" imported");
  if(failures.length){setRows(failures);setError(failures.length+" contacts could not be saved. Please review and retry or import them manually.");setProgress(0);}
  else onClose();
 };
 return <div className={css.backdrop} onMouseDown={event=>{if(event.target===event.currentTarget&&!importing)onClose();}}>
  <section className={css.dialog} role="dialog" aria-modal="true" aria-label="Import contacts from CSV">
   <div className={css.head}><div><p className="c-eyebrow">YOUR PEOPLE / BRING THEM IN</p><h2 className="c-serif">Import <em>your contacts.</em></h2></div><button type="button" aria-label="Close import dialog" onClick={onClose} disabled={importing}><HiOutlineXMark/></button></div>
   <p className={css.intro}>Bring contacts from a CSV into your account. Review the file first — nothing is added until you confirm.</p>
   <label className={css.upload}><HiOutlineArrowUpTray/><strong>{name||"Choose a .csv file"}</strong><span>Supports Name and Phone number columns · max 200 rows</span><input ref={fileRef} type="file" accept=".csv,text/csv" onChange={e=>void choose(e)} disabled={importing}/></label>
   {rows.length>0&&<div className={css.preview}><div className={css.previewHead}><HiOutlineDocumentText/><strong>{rows.length} ready to import</strong><span>{skipped} skipped (invalid or duplicates)</span></div><ul>{rows.slice(0,5).map((person,index)=><li key={index}><span>{person.name}</span><span>{person.number}</span></li>)}</ul>{rows.length>5&&<p>+ {rows.length-5} more contacts</p>}</div>}
   {error&&<p className={css.error} role="alert">{error}</p>}
   {name&&!error&&!rows.length&&<p className={css.notice}>No new valid contacts found. Duplicate entries and invalid numbers are skipped.</p>}
   <div className={css.actions}><button type="button" className={css.cancel} onClick={onClose} disabled={importing}>Cancel</button><button type="button" className={css.submit} disabled={!rows.length||importing} onClick={()=>void submit()}>{importing?"Importing "+progress+" / "+rows.length:"Import "+rows.length+" contacts"} ↗</button></div>
   <p className={css.disclaimer}>Contacts are added using the contact API of your signed-in account. Files stay in your browser; no extra upload service is used.</p>
  </section>
 </div>;
}
