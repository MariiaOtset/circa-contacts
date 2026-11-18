import {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors";
import {HiOutlineArrowUpRight,HiOutlineUserPlus,HiOutlineMagnifyingGlass,HiOutlineShieldCheck,HiOutlineStar,HiOutlineArrowDownTray,HiOutlinePencilSquare} from "react-icons/hi2";
import css from "./HomePage.module.css";
const people=[
 {id:"aj",initials:"AJ",name:"Alex Johnson",role:"Creative director",tone:"lavender"},
 {id:"sm",initials:"SM",name:"Sophie Martin",role:"Brand designer",tone:"peach"},
 {id:"mr",initials:"MR",name:"Marcus Reed",role:"Photographer",tone:"mint"},
 {id:"tc",initials:"TC",name:"Taylor Chen",role:"Product strategist",tone:"blue"}
];
const features=[
 {icon:<HiOutlineUserPlus/>,title:"A home for your people",text:"Keep names and numbers in a clean, considered address book."},
 {icon:<HiOutlineMagnifyingGlass/>,title:"Find them in a moment",text:"Search by name or number, sort, and keep favourites close."},
 {icon:<HiOutlineShieldCheck/>,title:"Your own workspace",text:"Log in to manage your personal, account-based contacts."}
];
const steps=[
 {n:"01",title:"Add a connection",text:"Create a contact with their name and phone number in seconds."},
 {n:"02",title:"Keep it organised",text:"Find favourites, search instantly, and update details whenever you need."},
 {n:"03",title:"Take it with you",text:"Sign in again or export your address book to a simple CSV file."}
];
export default function HomePage(){
 const loggedIn=useSelector(selectIsLoggedIn);
 const [previewSearch,setPreviewSearch]=useState(""),[onlyStars,setOnlyStars]=useState(false),[stars,setStars]=useState(["sm"]);
 const destination=loggedIn?"/contacts":"/register";
 const visible=people.filter(person=>(!onlyStars||stars.includes(person.id))&&(person.name+" "+person.role).toLowerCase().includes(previewSearch.toLowerCase()));
 return <div className={css.page}>
  <section className={css.hero}><div className={css.heroGrid+" c-container"}>
   <div className={css.heroCopy}>
    <p className="c-eyebrow">✳ &nbsp; THE ART OF STAYING IN TOUCH</p>
    <h1 className="c-serif">Your people. <em>Beautifully</em> together.</h1>
    <p>One lovely, organised place for the people who matter. Save contacts, find familiar names, and keep your circle close — without the clutter.</p>
    <div className={css.actions}><Link to={destination} className="c-btn">{loggedIn?"Open my contacts":"Get started for free"} <HiOutlineArrowUpRight/></Link><a href="#features" className={css.secondary}>Explore the features <span>↓</span></a></div>
    <div className={css.heroNote}><span className="c-dot"/> YOUR PERSONAL CONTACTS, SIMPLIFIED <span>·</span> FREE TO EXPLORE</div>
   </div>
   <div className={css.visual}>
    <div className={css.backCircle} aria-hidden="true"/>
    <div className={css.preview} aria-label="Interactive contact manager preview with sample data">
     <div className={css.previewTop}><div><span className={css.mark}>✳</span><strong>CIRCA<span>.</span></strong></div><span className={css.demoBadge}>INTERACTIVE PREVIEW</span></div>
     <div className={css.previewBody}><div className={css.previewHeading}><div><p>YOUR SAMPLE WORKSPACE</p><h2 className="c-serif">Good company.</h2></div><span>{people.length} people</span></div>
      <label className={css.previewSearch}><HiOutlineMagnifyingGlass/><input value={previewSearch} onChange={e=>setPreviewSearch(e.target.value)} placeholder="Try searching a name..." aria-label="Search demo contacts"/></label>
      <div className={css.previewTabs}><button type="button" className={!onlyStars?css.tabActive:""} onClick={()=>setOnlyStars(false)}>All people</button><button type="button" className={onlyStars?css.tabActive:""} onClick={()=>setOnlyStars(true)}>★ Favourites ({stars.length})</button></div>
      <div className={css.previewList}>{visible.length?visible.map(person=><div key={person.id} className={css.previewPerson}><span className={css.avatar+" "+css[person.tone]}>{person.initials}</span><div><strong>{person.name}</strong><small>{person.role}</small></div><button type="button" title={stars.includes(person.id)?"Remove from demo favourites":"Add to demo favourites"} aria-label={(stars.includes(person.id)?"Remove ":"Save ")+person.name} aria-pressed={stars.includes(person.id)} className={stars.includes(person.id)?css.starActive:""} onClick={()=>setStars(prev=>prev.includes(person.id)?prev.filter(id=>id!==person.id):[...prev,person.id])}><HiOutlineStar/></button></div>):<p className={css.previewEmpty}>No sample contacts found.</p>}</div>
      <p className={css.previewFoot}>Try searching and starring contacts. Sample data only.</p>
     </div>
    </div>
    <div className={css.floatingTag}><span>✦</span> MADE FOR REAL CONNECTIONS</div>
   </div>
  </div></section>
  <section className={css.quickbar}><div className="c-container"><span>ONE SPACE. YOUR PEOPLE.</span><div><span>✳ Add &amp; edit</span><span>✳ Search &amp; favourite</span><span>✳ Export &amp; keep</span></div></div></section>
  <section className={css.features+" c-container"} id="features"><div className={css.sectionHead}><div><p className="c-eyebrow">INTUITIVE BY DESIGN</p><h2 className="c-serif">Simple things, <em>done beautifully.</em></h2></div><p>No complicated tools. Just the small, thoughtful features that help you stay connected.</p></div>
   <div className={css.featureGrid}>{features.map((f,i)=><article className={css.feature} key={f.title}><div className={css.featureTop}><span>0{i+1} / CIRCA</span><span className={css.featureIcon}>{f.icon}</span></div><h3 className="c-serif">{f.title}</h3><p>{f.text}</p></article>)}</div>
  </section>
  <section className={css.walkthrough}><div className={css.walkthroughInner+" c-container"}>
   <div className={css.walkthroughCopy}><p className="c-eyebrow">MADE TO MAKE EVERYDAY EASIER</p><h2 className="c-serif">A better way to <em>keep in touch.</em></h2><p>Everything important, without everything getting in the way.</p><Link to={destination} className="c-btn">{loggedIn?"Go to workspace":"Create your space"} <HiOutlineArrowUpRight/></Link></div>
   <div className={css.steps}>{steps.map(s=><div className={css.step} key={s.n}><span>{s.n}</span><div><h3>{s.title}</h3><p>{s.text}</p></div><span aria-hidden="true">↗</span></div>)}</div>
  </div></section>
  <section className={css.closing+" c-container"}><div><p className="c-eyebrow">YOUR CIRCLE STARTS HERE</p><h2 className="c-serif">Good connections. <em>One beautiful space.</em></h2></div><Link to={destination} className="c-btn">{loggedIn?"Open CIRCA":"Start your address book"} <HiOutlineArrowUpRight/></Link></section>
  <div className={css.footerExtra} aria-hidden="true"><HiOutlineArrowDownTray/><HiOutlinePencilSquare/><HiOutlineStar/></div>
 </div>;
}
