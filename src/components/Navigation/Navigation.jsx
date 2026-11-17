import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {selectIsLoggedIn} from "../../redux/auth/selectors";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import css from "./Navigation.module.css";
export default function Navigation(){
 const isLoggedIn=useSelector(selectIsLoggedIn);
 const active=({isActive})=>css.link+(isActive?" "+css.active:"");
 return <header className={css.header}><nav className={css.navigation} aria-label="Main navigation">
  <NavLink to="/" className={css.brand} aria-label="Circa home"><span className={css.symbol} aria-hidden="true">✳</span><span>CIRCA<span className={css.brandDot}>.</span><small>KEEP YOUR PEOPLE CLOSE</small></span></NavLink>
  <div className={css.links}><NavLink end to="/" className={active}>Discover</NavLink>{isLoggedIn&&<NavLink to="/contacts" className={active}>Your contacts</NavLink>}</div>
  <div className={css.account}>{isLoggedIn?<UserMenu/>:<AuthNav/>}</div>
 </nav></header>;
}
