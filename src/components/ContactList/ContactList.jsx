import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
export default function ContactList({contacts=[],starred=[],onToggleStar}){
 return <ul className={css.list}>{contacts.map(contact=><li key={contact.id} className={css.item}><Contact contact={contact} starred={starred.includes(contact.id)} onToggleStar={()=>onToggleStar(contact.id)}/></li>)}</ul>;
}
