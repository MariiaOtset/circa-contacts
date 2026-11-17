import {useId} from "react";
import {Formik,Form,Field,ErrorMessage} from "formik";
import {useDispatch,useSelector} from "react-redux";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {addContact,updateContact} from "../../redux/contacts/operations";
import {selectContacts} from "../../redux/contacts/selectors";
import {HiOutlineUser,HiOutlinePhone,HiOutlineArrowUpRight} from "react-icons/hi2";
import css from "./ContactForm.module.css";
const schema=Yup.object({name:Yup.string().trim().min(2,"Enter at least 2 characters").max(60,"Maximum 60 characters").required("Name is required"),number:Yup.string().trim().required("Phone number is required").test("valid-phone","Use 7–20 digits, with optional +, spaces or brackets",value=>{if(!value)return false;return /^[+\d()\s.-]+$/.test(value)&&/^\+?\d+$/.test(value.replace(/[()\s.\-]/g,""))&&value.replace(/\D/g,"").length>=7&&value.replace(/\D/g,"").length<=20;})});
export default function ContactForm({contact=null,onSuccess,onClose}){
 const dispatch=useDispatch(),all=useSelector(selectContacts),nameId=useId(),phoneId=useId();
 const edit=!!contact;
 const submit=async(values,{setSubmitting,resetForm})=>{
  const name=values.name.trim().replace(/\s+/g," "),number=values.number.trim();
  const duplicate=all.some(person=>person.id!==contact?.id&&person.name?.trim().toLowerCase()===name.toLowerCase()&&person.number?.trim()===number);
  if(duplicate){toast.error("This contact is already in your address book.");setSubmitting(false);return;}
  try{
   if(edit)await dispatch(updateContact({id:contact.id,name,number})).unwrap();
   else await dispatch(addContact({name,number})).unwrap();
   toast.success(edit?"Contact updated":"Added to your contacts");
   if(!edit)resetForm();
   onSuccess?.();
  }catch{toast.error(edit?"Could not save changes. Try again.":"Could not add contact. Try again.");}
  finally{setSubmitting(false);}
 };
 return <Formik initialValues={{name:contact?.name||"",number:contact?.number||""}} validationSchema={schema} onSubmit={submit} enableReinitialize>{({isSubmitting})=><Form className={css.form} noValidate>
  <div className={css.field}><label htmlFor={nameId}>FULL NAME</label><div className={css.inputWrap}><HiOutlineUser aria-hidden="true"/><Field id={nameId} name="name" placeholder="e.g. Alex Johnson" autoComplete="name" /></div><ErrorMessage name="name" component="small" className={css.error}/></div>
  <div className={css.field}><label htmlFor={phoneId}>PHONE NUMBER</label><div className={css.inputWrap}><HiOutlinePhone aria-hidden="true"/><Field id={phoneId} name="number" type="tel" placeholder="e.g. +44 7700 900123" autoComplete="tel" /></div><ErrorMessage name="number" component="small" className={css.error}/></div>
  <div className={css.actions}><button className={css.submit} type="submit" disabled={isSubmitting}>{isSubmitting?"Saving…":edit?"Save changes":"Add to my contacts"} <HiOutlineArrowUpRight aria-hidden="true"/></button>{edit&&onClose&&<button className={css.cancel} type="button" onClick={onClose}>Cancel</button>}</div>
  {!edit&&<p className={css.note}>Your contacts are stored in your account and accessible when you sign in.</p>}
 </Form>}</Formik>;
}
