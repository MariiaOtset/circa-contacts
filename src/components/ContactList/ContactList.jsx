import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
export default function ContactList({contacts=[],starred=[],onToggleStar,groupMap={},onGroupChange,compact=false}){
 return <ul className={css.list+(compact?" "+css.compact:"")}>{contacts.map(contact=><li key={contact.id} className={css.item}><Contact contact={contact} starred={starred.includes(contact.id)} onToggleStar={()=>onToggleStar(contact.id)} group={groupMap[contact.id]||""} onGroupChange={value=>onGroupChange(contact.id,value)} compact={compact}/></li>)}</ul>;
}
