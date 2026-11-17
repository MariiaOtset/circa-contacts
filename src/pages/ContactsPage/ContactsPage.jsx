import {useEffect,useMemo,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import toast from "react-hot-toast";
import {HiOutlineUserGroup,HiOutlineStar,HiOutlineArrowDownTray,HiOutlineArrowUpTray,HiOutlineArrowPath,HiOutlinePlus,HiOutlineArrowUpRight,HiOutlineSquares2X2,HiOutlineBars3} from "react-icons/hi2";
import {fetchContacts} from "../../redux/contacts/operations";
import {selectContacts,selectFilteredContacts,selectLoading,selectError} from "../../redux/contacts/selectors";
import {selectUser} from "../../redux/auth/selectors";
import {changeFilter} from "../../redux/filter/slice";
import {selectNameFilter} from "../../redux/filter/selectors";
import ContactForm from "../../components/ContactForm/ContactForm";
import ImportContacts from "../../components/ImportContacts/ImportContacts";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import css from "./ContactsPage.module.css";

const storageKey=owner=>"circa-favourites-v1:"+owner;
const groupStorageKey=owner=>"circa-groups-v1:"+owner;
const readGroups=owner=>{try{const saved=JSON.parse(localStorage.getItem(groupStorageKey(owner))||"{}");return saved&&typeof saved==="object"&&!Array.isArray(saved)?saved:{};}catch{return {};}};
const groupsOptions=["Friends","Family","Work","Other"];
const readStars=owner=>{try{const saved=JSON.parse(localStorage.getItem(storageKey(owner))||"[]");return Array.isArray(saved)?saved.filter(id=>typeof id==="string"):[];}catch{return [];}};
const csvValue=value=>{const str=String(value??"");const escaped=/^[=+\-@\t\r]/.test(str)?"'"+str:str;return '"'+escaped.replace(/"/g,'""')+'"';};
export default function ContactsPage(){
 const dispatch=useDispatch(),user=useSelector(selectUser),contacts=useSelector(selectContacts),filtered=useSelector(selectFilteredContacts),loading=useSelector(selectLoading),error=useSelector(selectError),search=useSelector(selectNameFilter);
 const owner=user?.email?.trim().toLowerCase()||"local";
 const [stars,setStars]=useState(()=>({owner,ids:readStars(owner)})),[section,setSection]=useState("all"),[sort,setSort]=useState("az"),[importOpen,setImportOpen]=useState(false),[viewMode,setViewMode]=useState("grid"),[groupFilter,setGroupFilter]=useState("all"),[groups,setGroups]=useState(()=>({owner,values:readGroups(owner)}));
 useEffect(()=>{dispatch(changeFilter(""));dispatch(fetchContacts());},[dispatch]);
 useEffect(()=>{setStars({owner,ids:readStars(owner)});setGroups({owner,values:readGroups(owner)});setGroupFilter("all");},[owner]);
 useEffect(()=>{if(stars.owner!==owner)return;try{localStorage.setItem(storageKey(owner),JSON.stringify(stars.ids));}catch{/* Optional browser storage */}},[stars,owner]);
 const starIds=useMemo(()=>stars.owner===owner?stars.ids:[],[stars,owner]);
 const groupMap=useMemo(()=>groups.owner===owner?groups.values:{},[groups,owner]);
 useEffect(()=>{if(groups.owner!==owner)return;try{localStorage.setItem(groupStorageKey(owner),JSON.stringify(groups.values));}catch{/* Local-only group labels */}},[groups,owner]);
 const changeGroup=(id,group)=>setGroups(prev=>({owner,values:{...(prev.owner===owner?prev.values:readGroups(owner)),[id]:group}}));
 const toggleStar=id=>setStars(prev=>{const old=prev.owner===owner?prev.ids:readStars(owner);return {owner,ids:old.includes(id)?old.filter(value=>value!==id):[...old,id]};});
 const starredCount=contacts.filter(c=>starIds.includes(c.id)).length;
 const shown=useMemo(()=>{
  const list=filtered.filter(c=>(section==="all"||starIds.includes(c.id))&&(groupFilter==="all"||(groupMap[c.id]||"")===groupFilter));
  if(sort==="az")return [...list].sort((a,b)=>a.name.localeCompare(b.name,undefined,{sensitivity:"base"}));
  if(sort==="za")return [...list].sort((a,b)=>b.name.localeCompare(a.name,undefined,{sensitivity:"base"}));
  return list;
 },[filtered,section,sort,starIds,groupFilter,groupMap]);
 const exportCsv=()=>{
  if(!contacts.length){toast.error("Add some contacts before exporting.");return;}
  const rows=[["Name","Phone number"],...contacts.map(c=>[c.name,c.number])].map(row=>row.map(csvValue).join(","));
  const csv="\uFEFF"+rows.join("\r\n");
  const href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
  const anchor=document.createElement("a");anchor.href=href;anchor.download="circa-contacts.csv";document.body.appendChild(anchor);anchor.click();anchor.remove();window.setTimeout(()=>URL.revokeObjectURL(href),1000);
  toast.success("Contacts exported to CSV");
 };
 const refresh=()=>dispatch(fetchContacts());
 return <main className={css.page}>
  <div className={css.dashboard+" c-container"}>
   <aside className={css.sidebar} aria-label="Workspace navigation"><div className={css.sidebarTop}><span className={css.sideIcon}>✳</span><div><strong>MY WORKSPACE</strong><small>PERSONAL ADDRESS BOOK</small></div></div><div className={css.navLabel}>COLLECTIONS</div><nav className={css.sideNav} aria-label="Contact categories"><button type="button" className={section==="all"?css.selected:""} onClick={()=>setSection("all")}><HiOutlineUserGroup/> All people <span>{contacts.length}</span></button><button type="button" className={section==="starred"?css.selected:""} onClick={()=>setSection("starred")}><HiOutlineStar/> Favourites <span>{starredCount}</span></button></nav><div className={css.sideFooter}><div className={css.sideFooterIcon}>♡</div><strong>The little connections matter.</strong><p>A well-kept contact list keeps your people just a little closer.</p></div><p className={css.sidebarCredit}>CIRCA / CONTACTS MANAGER — V1</p></aside>
   <div className={css.workspace}><header className={css.welcome}><div><p className="c-eyebrow">YOUR SPACE / THE CONTACT EDITION</p><h1 className="c-serif">Your people,<br/><em>beautifully organised.</em></h1><p>Keep your circle close. Search, organise, import, and manage the details that matter.</p></div><div className={css.welcomeBadge}><span aria-hidden="true">✳</span><strong>HELLO, {user?.name?.trim()?.split(" ")[0]||"FRIEND"}</strong><small>YOU ARE IN GOOD COMPANY</small></div></header>
    <div className={css.metricGrid}><div className={css.metric}><div><span>PEOPLE IN YOUR CIRCLE</span><HiOutlineUserGroup/></div><strong>{contacts.length.toString().padStart(2,"0")}</strong><p>Total contacts in your address book</p></div><div className={css.metric+" "+css.metricStar}><div><span>THE SPECIAL ONES</span><HiOutlineStar/></div><strong>{starredCount.toString().padStart(2,"0")}</strong><p>Saved to your favourites on this device</p></div><div className={css.metric+" "+css.metricNote}><div><span>YOUR PERSONAL DIRECTORY</span><span aria-hidden="true">✦</span></div><h2 className="c-serif">Keep good<br/>company.</h2><a href="#add-contact">Add someone new <HiOutlineArrowUpRight aria-hidden="true"/></a></div></div>
    <div className={css.columns}><section className={css.listSection} aria-label="Your address book"><div className={css.listHeading}><div><p className="c-eyebrow">YOUR CIRCLE, ALL IN ONE PLACE</p><h2 className="c-serif">{section==="starred"?"Your favourite people.":"The good company."}</h2></div><div className={css.dataActions}><button type="button" title="Import contacts from CSV" className={css.export} onClick={()=>setImportOpen(true)}><HiOutlineArrowUpTray/> Import</button><button type="button" title="Export all contacts as CSV" className={css.export} onClick={exportCsv}><HiOutlineArrowDownTray/> Export CSV</button></div></div>
      <div className={css.toolbar}><SearchBox/><label className={css.sort}>GROUP <select aria-label="Filter contact group" value={groupFilter} onChange={e=>setGroupFilter(e.target.value)}><option value="all">All groups</option><option value="">Uncategorised</option>{groupsOptions.map(item=><option key={item} value={item}>{item}</option>)}</select></label><label className={css.sort}>SORT CONTACTS <select value={sort} aria-label="Sort contacts" onChange={e=>setSort(e.target.value)}><option value="az">Name A–Z</option><option value="za">Name Z–A</option><option value="default">Default order</option></select></label></div>
      <div className={css.listInfo}><span>{shown.length} {shown.length===1?"PERSON":"PEOPLE"} IN VIEW</span><div className={css.listActions}><div className={css.viewSwitch} role="group" aria-label="Contact view"><button aria-label="Grid view" title="Grid view" aria-pressed={viewMode==="grid"} className={viewMode==="grid"?css.selectedView:""} type="button" onClick={()=>setViewMode("grid")}><HiOutlineSquares2X2/></button><button aria-label="List view" title="List view" aria-pressed={viewMode==="list"} className={viewMode==="list"?css.selectedView:""} type="button" onClick={()=>setViewMode("list")}><HiOutlineBars3/></button></div><button type="button" onClick={()=>void refresh()} disabled={loading} aria-label="Refresh contact list" title="Refresh contacts"><HiOutlineArrowPath/> Refresh</button></div></div>
      {error&&<div className={css.error} role="alert">We could not load or update your contacts. {typeof error==="string"?error:"Please try again."} <button type="button" onClick={()=>void refresh()}>Retry ↗</button></div>}
      {loading&&contacts.length===0?<div className={css.loading}><Loader/><div className={css.skeletons}>{Array.from({length:4},(_,i)=><div key={i}/>)}</div></div>:shown.length?<ContactList contacts={shown} starred={starIds} onToggleStar={toggleStar} groupMap={groupMap} onGroupChange={changeGroup} compact={viewMode==="list"}/>:<div className={css.empty}><span aria-hidden="true">{section==="starred"?"♡":"✳"}</span><h3 className="c-serif">{section==="starred"?"Your favourites will live here.":groupFilter!=="all"?"No one in this group yet.":search?"Nobody by that name.":"Every connection starts somewhere."}</h3><p>{section==="starred"?"Tap the star on someone in your contacts to save them here.":search?"Try a different name or phone number to find your person.":"Add your first contact and start building your circle."}</p>{section==="starred"?<button type="button" className="c-btn" onClick={()=>setSection("all")}>View all contacts ↗</button>:search?<button type="button" className="c-btn" onClick={()=>dispatch(changeFilter(""))}>Clear search ↗</button>:<a href="#add-contact" className="c-btn">Add a contact ↗</a>}</div>}
     </section>
     <aside id="add-contact" className={css.formColumn}><div className={css.formCard}><div className={css.formTop}><span className={css.addIcon}><HiOutlinePlus/></span><p className="c-eyebrow">MAKE A NEW CONNECTION</p><h2 className="c-serif">Add someone<br/><em>to your circle.</em></h2><p>A new name, a new connection. Keep the important details close.</p></div><ContactForm/></div><div className={css.privacyNote}><span aria-hidden="true">✦</span><div><strong>A little peace of mind</strong><p>Contacts sync through your account. Favourites and group labels are stored only in this browser.</p></div></div></aside>
    </div>
   </div>
  </div>
  {importOpen&&<ImportContacts existing={contacts} onClose={()=>setImportOpen(false)}/>}
 </main>;
}
