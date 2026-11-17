import {NavLink} from "react-router-dom";
import css from "./AuthNav.module.css";
export default function AuthNav(){return <div className={css.list}><NavLink className={css.login} to="/login">Log in</NavLink><NavLink className={css.register} to="/register">Get started <span aria-hidden="true">↗</span></NavLink></div>;}
