import {Form,Formik} from "formik";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {register} from "../../redux/auth/operations";
import FormLabel from "../FormLabel/FormLabel";
import css from "./RegisterForm.module.css";
const initial={name:"",email:"",password:""};
const schema=Yup.object({name:Yup.string().trim().min(2,"Please enter at least 2 characters").max(60,"Name is too long").required("Your name is required"),email:Yup.string().email("Enter a valid email address").required("Email is required"),password:Yup.string().min(7,"At least 7 characters are required").required("Password is required")});
export default function RegisterForm(){
 const dispatch=useDispatch();
 const submit=async(values,{setSubmitting})=>{try{await dispatch(register({...values,name:values.name.trim()})).unwrap();toast.success("Your space is ready!");}catch(error){toast.error(error===400||error===409?"This email might already be registered":"Unable to create an account. Please try again.");}finally{setSubmitting(false);}};
 return <Formik initialValues={initial} validationSchema={schema} onSubmit={submit}>{({isSubmitting})=><Form className={css.form} noValidate><FormLabel title="username"/><FormLabel title="email"/><FormLabel title="password" signUp/><button className={css.btn} type="submit" disabled={isSubmitting}>{isSubmitting?"Creating your space…":"Create my free account"} <span aria-hidden="true">↗</span></button><p className={css.note}>Sign up to manage contacts securely with your account.</p></Form>}</Formik>;
}
