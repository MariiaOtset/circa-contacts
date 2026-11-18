import {Suspense,lazy,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {Route,Routes} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import {refreshUser} from "./redux/auth/operations";
import {selectIsRefreshing} from "./redux/auth/selectors";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import Loader from "./components/Loader/Loader";
import {Toaster} from "react-hot-toast";
import "./App.css";
const HomePage=lazy(()=>import("./pages/HomePage/HomePage"));
const RegisterPage=lazy(()=>import("./pages/RegisterPage/RegisterPage"));
const LoginPage=lazy(()=>import("./pages/LoginPage/LoginPage"));
const ContactsPage=lazy(()=>import("./pages/ContactsPage/ContactsPage"));
const NotFoundPage=lazy(()=>import("./pages/NotFoundPage/NotFoundPage"));
export default function App(){
 const dispatch=useDispatch(),refreshing=useSelector(selectIsRefreshing);
 useEffect(()=>{dispatch(refreshUser());},[dispatch]);
 if(refreshing)return <div className="app-loading" role="status"><div><span aria-hidden="true">✳</span>Restoring your workspace…</div></div>;
 return <Layout><ScrollToTop/><Suspense fallback={<div className="app-loading" role="status"><Loader/></div>}><Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/register" element={<RestrictedRoute redirectTo="/contacts" component={<RegisterPage/>}/>}/>
  <Route path="/login" element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage/>}/>}/>
  <Route path="/contacts" element={<PrivateRoute redirectTo="/login" component={<ContactsPage/>}/>}/>
  <Route path="*" element={<NotFoundPage/>}/>
 </Routes></Suspense><Toaster position="top-center" toastOptions={{style:{borderRadius:"14px",fontFamily:"Manrope,sans-serif",fontSize:"13px"}}}/></Layout>;
}
