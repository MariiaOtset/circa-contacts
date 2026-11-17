import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors";
import {HiOutlineArrowUpRight,HiOutlineUserPlus,HiOutlineMagnifyingGlass,HiOutlineShieldCheck} from "react-icons/hi2";
import css from "./HomePage.module.css";
const sample=[
 {initials:"AJ",name:"Alex Johnson",role:"Creative director",tone:"lavender"},
 {initials:"SM",name:"Sophie Martin",role:"Brand designer",tone:"peach"},
 {initials:"MR",name:"Marcus Reed",role:"Photographer",tone:"mint"},
 {initials:"TC",name:"Taylor Chen",role:"Product strategist",tone:"blue"}
];
const features=[
 {n:"01",icon:<HiOutlineUserPlus/>,title:"Add the important ones",text:"Save names and numbers in one dedicated, easy-to-manage workspace."},
 {n:"02",icon:<HiOutlineMagnifyingGlass/>,title:"Find anyone in seconds",text:"Search your contacts by name or phone number without digging through lists."},
 {n:"03",icon:<HiOutlineShieldCheck/>,title:"Your own private space",text:"Sign in to access your personal address book. Your people are tied to your account."}
];
export default function HomePage(){
 const loggedIn=useSelector(selectIsLoggedIn);
 const destination=loggedIn?"/contacts":"/register";
 return <div className={css.page}>
  <section className={css.hero}><div className={css.heroGrid+" c-container"}>
   <div className={css.heroCopy}><p className="c-eyebrow"><span aria-hidden="true">✳</span> CONNECTIONS, BEAUTIFULLY KEPT</p>
    <h1 className="c-serif">The people<br/>who make<br/><em>it matter.</em></h1>
    <p>Every good connection deserves a place. Meet CIRCA — a calmer, more beautiful way to keep your favourite people a little closer.</p>
    <div className={css.actions}><Link to={destination} className="c-btn">{loggedIn?"Open my contacts":"Create your space"} <HiOutlineArrowUpRight/></Link><a href="#how-it-works" className={css.secondary}>Take a closer look <span>↓</span></a></div>
    <div className={css.heroNote}><span className="c-dot"/><span>YOUR PERSONAL CONTACT MANAGER</span><span>NO SUBSCRIPTION REQUIRED</span></div>
   </div>
   <div className={css.visual} aria-label="Illustration of the Circa contact manager">
    <div className={css.orbitOne}/><div className={css.orbitTwo}/><div className={css.floatingNote}><span aria-hidden="true">✦</span><span>Good people.<br/><strong>All in one place.</strong></span></div>
    <div className={css.preview}><div className={css.previewBar}><div><span className={css.appLogo}>✳</span><strong>CIRCA.</strong></div><span className={css.previewPill}>UI PREVIEW</span></div><div className={css.previewBody}><p>YOUR PEOPLE</p><h2 className="c-serif">The good company.</h2><div className={css.mockSearch}>⌕ &nbsp; Search your people…</div><div className={css.mockHeader}><span>ALL CONTACTS</span><span>04 PEOPLE</span></div>{sample.map(person=><div className={css.previewPerson} key={person.initials}><span className={css[person.tone]}>{person.initials}</span><div><strong>{person.name}</strong><small>{person.role}</small></div><i aria-hidden="true">↗</i></div>)}</div></div>
    <div className={css.floatingStar}>✳</div>
   </div>
  </div></section>
  <section className={css.intro+" c-container"} id="how-it-works"><p className="c-eyebrow">THE LITTLE THINGS, DONE WELL</p><div><h2 className="c-serif">Less searching.<br/><em>More connecting.</em></h2><p>Your contacts are more than just phone numbers. CIRCA gives you an intentional space to keep the people who matter within reach.</p></div></section>
  <section className={css.features+" c-container"} aria-label="How Circa helps">{features.map(f=><article className={css.feature} key={f.n}><div className={css.featureTop}><span>{f.n} / THE EXPERIENCE</span><div>{f.icon}</div></div><h3 className="c-serif">{f.title}</h3><p>{f.text}</p></article>)}</section>
  <section className={css.story}><div className={css.storyInner+" c-container"}><div className={css.storyVisual}><div className={css.storyBubble}>A little more<br/><em>human.</em></div><div className={css.storyAvatarA}>A</div><div className={css.storyAvatarB}>S</div><div className={css.storyAvatarC}>M</div><span>THE PEOPLE IN YOUR CORNER</span></div><div className={css.storyCopy}><p className="c-eyebrow">KEEP IT PERSONAL</p><h2 className="c-serif">Great things<br/>begin with <em>hello.</em></h2><p>From familiar names to new introductions, keep your circle organised, easy to find, and ready when you need it.</p><Link to={destination} className="c-btn">{loggedIn?"Go to my contacts":"Start your address book"} <HiOutlineArrowUpRight/></Link></div></div></section>
  <section className={css.closing+" c-container"}><p className="c-eyebrow">YOUR CIRCLE STARTS HERE</p><h2 className="c-serif">Make room for<br/><em>good connections.</em></h2><Link to={destination} className="c-btn">{loggedIn?"Open my workspace":"Get started for free"} <HiOutlineArrowUpRight/></Link></section>
 </div>;
}
