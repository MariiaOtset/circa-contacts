import {useId,useState} from "react";
import {ErrorMessage,Field} from "formik";
import {HiOutlineEye,HiOutlineEyeSlash} from "react-icons/hi2";
import css from "./FormLabel.module.css";
export default function FormLabel({title,signUp=false}){
 const id=useId(),[visible,setVisible]=useState(false);
 const name=title==="username"?"name":title;
 const password=name==="password";
 const type=password?(visible?"text":"password"):name==="email"?"email":"text";
 const label=title==="username"?"Full name":title==="email"?"Email address":"Password";
 return <div className={css.formLabel}><label htmlFor={id} className={css.labelTitle}>{label}</label><div className={css.fieldWrapper}><Field id={id} name={name} className={css.formField} type={type} autoComplete={password?(signUp?"new-password":"current-password"):name==="email"?"email":"name"} placeholder={title==="username"?"Your full name":name==="email"?"you@example.com":"Enter your password"}/>{password&&<button className={css.visibility} type="button" onClick={()=>setVisible(v=>!v)} aria-label={visible?"Hide password":"Show password"}>{visible?<HiOutlineEyeSlash/>:<HiOutlineEye/>}</button>}</div><ErrorMessage name={name} component="span" className={css.errorMessage}/></div>;
}
