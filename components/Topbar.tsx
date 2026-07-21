import Link from "next/link";
export function Topbar({title,subtitle}:{title:string;subtitle:string}){return <header className="topbar"><div><h1>{title}</h1><p>{subtitle}</p></div><div style={{display:"flex",gap:10,alignItems:"center"}}><span className="chip blue">SaaS MVP</span><Link className="btn ghost" href="/login">Connexion</Link></div></header>}
