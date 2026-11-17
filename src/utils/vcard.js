/** Encode basic name/phone contacts as interoperable UTF-8 vCard 3.0 records. */
export function escapeVCardText(value){
 return String(value??"").replace(/\\/g,"\\\\").replace(/\r\n|\r|\n/g,"\\n").replace(/;/g,"\\;").replace(/,/g,"\\,");
}
export function serializeContactsVCard(contacts){
 if(!Array.isArray(contacts))throw new TypeError("Contacts must be an array");
 return contacts.map(contact=>{
  const name=String(contact.name??"").trim();
  const words=name.split(/\s+/).filter(Boolean);
  const surname=words.length>1?words.pop():"";
  const given=words.join(" ");
  const phone=String(contact.number??"").replace(/[^\d+().\s-]/g,"").trim();
  return [
   "BEGIN:VCARD",
   "VERSION:3.0",
   "FN:"+escapeVCardText(name),
   "N:"+escapeVCardText(surname)+";"+escapeVCardText(given)+";;;",
   "TEL;TYPE=CELL:"+phone,
   "END:VCARD"
  ].join("\r\n");
 }).join("\r\n")+"\r\n";
}
