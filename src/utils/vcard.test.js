import test from "node:test";
import assert from "node:assert/strict";
import {escapeVCardText,serializeContactsVCard} from "./vcard.js";
test("exports a valid importable vCard with a full name",()=>{
 const text=serializeContactsVCard([{name:"Mary Smith",number:"+44 7700 900123"}]);
 assert.match(text,/BEGIN:VCARD\r\nVERSION:3\.0/);
 assert.match(text,/FN:Mary Smith\r\nN:Smith;Mary;;;/);
 assert.match(text,/TEL;TYPE=CELL:\+44 7700 900123/);
 assert.ok(text.endsWith("END:VCARD\r\n"));
});
test("handles short names, multiple contacts, and field escapes",()=>{
 const text=serializeContactsVCard([{name:"Ana",number:"123-456"},{name:"A, B; C",number:"456.789"}]);
 assert.equal((text.match(/BEGIN:VCARD/g)||[]).length,2);
 assert.match(text,/N:;Ana;;;/);
 assert.match(text,/FN:A\\, B\\; C/);
});
test("does not allow an untrusted phone field to inject a new vCard record",()=>{
 const text=serializeContactsVCard([{name:"Alex",number:"1234\nBEGIN:VCARD"}]);
 assert.equal((text.match(/BEGIN:VCARD/g)||[]).length,1);
 assert.ok(!text.includes("1234\nBEGIN:VCARD"));
 assert.equal(escapeVCardText("A\\B\nC"),"A\\\\B\\nC");
});
