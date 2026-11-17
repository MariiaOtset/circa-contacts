import {Form,Formik} from "formik";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {logIn} from "../../redux/auth/operations";
import FormLabel from "../FormLabel/FormLabel";
import css from "./LoginForm.module.css";
const initial={email:"",password:""};
const schema=Yup.object({email:Yup.string().email("Enter a valid email address").required("Email is required"),password:Yup.string().required("Password is required")});
export default function LoginForm(){
 const dispatch=useDispatch();
 const submit=async(values,{setSubmitting})=>{try{await dispatch(logIn(values)).unwrap();toast.success("Welcome back!");}catch(error){toast.error(error===400||error===401?"Incorrect email or password":"Unable to sign in. Please try again.");}finally{setSubmitting(false);}};
 return <Formik initialValues={initial} validationSchema={schema} onSubmit={submit}>{({isSubmitting})=><Form className={css.form} noValidate><FormLabel title="email"/><FormLabel title="password"/><button className={css.btn} type="submit" disabled={isSubmitting}>{isSubmitting?"Signing in…":"Log in to my space"} <span aria-hidden="true">↗</span></button><div className={css.note}><span aria-hidden="true">✦</span> YOUR CONTACTS. YOUR PRIVATE SPACE.</div></Form>}</Formik>;
}
