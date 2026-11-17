import css from "./Loader.module.css";
export default function Loader(){return <div className={css.loader} role="status" aria-label="Loading"><span className={css.icon} aria-hidden="true">✳</span><span>Loading your workspace…</span></div>}
