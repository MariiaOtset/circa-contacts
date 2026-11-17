import {useDispatch,useSelector} from "react-redux";
import {HiOutlineMagnifyingGlass,HiOutlineXMark} from "react-icons/hi2";
import {changeFilter} from "../../redux/filter/slice";
import {selectNameFilter} from "../../redux/filter/selectors";
import css from "./SearchBox.module.css";
export default function SearchBox(){
 const dispatch=useDispatch(),search=useSelector(selectNameFilter);
 return <div className={css.searchWrapper}><label htmlFor="contact-search">SEARCH YOUR PEOPLE</label><div className={css.box}><HiOutlineMagnifyingGlass aria-hidden="true"/><input id="contact-search" type="search" className={css.search} value={search||""} autoComplete="off" placeholder="Search name or phone number..." onChange={e=>dispatch(changeFilter(e.target.value))}/>{search&&<button type="button" aria-label="Clear search" onClick={()=>dispatch(changeFilter(""))}><HiOutlineXMark/></button>}</div></div>;
}
