import {useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import css from "./Layout.module.css";
export default function Layout({children}){
 const location=useLocation();
 return <div className={css.layout}><Navigation/><main className={css.mainContent}>{children}</main>{location.pathname!=="/contacts"&&<footer className={css.footer}><div className="c-container"><div><span className={css.brand}>✳ &nbsp; CIRCA<span>.</span></span><p>Good connections deserve a beautiful place to live.</p></div><div><span>AN INTENTIONAL SPACE FOR YOUR PEOPLE.</span><small>© {new Date().getFullYear()} CIRCA · Portfolio project</small></div></div></footer>}</div>;
}
