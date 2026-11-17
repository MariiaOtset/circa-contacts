import {Link} from "react-router-dom";
import css from "./NotFoundPage.module.css";
export default function NotFoundPage(){return <section className={css.page}><div className="c-container"><p className="c-eyebrow">ERROR / 404</p><span className={css.symbol} aria-hidden="true">✳</span><h1 className="c-serif">This connection<br/><em>got lost.</em></h1><p>We could not find the page you are looking for. Let us take you back somewhere familiar.</p><Link to="/" className="c-btn">Back to home ↗</Link></div></section>;}
