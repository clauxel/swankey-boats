"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [{href:"/about", label:"About Swankey"},{href:"/gallery",label:"On the water"},{href:"/product",label:"Our boats"},{href:"/technology",label:"Technology"},{href:"/dealers",label:"Dealers"},{href:"/contact",label:"Contact"}];
export function Header() {
 const pathname = usePathname();
 const [open,setOpen] = useState(false);
 const [scrolled,setScrolled] = useState(false);
 const toggle = useRef<HTMLButtonElement>(null);
 useEffect(() => { const scroll=()=>setScrolled(window.scrollY>80); scroll(); window.addEventListener("scroll",scroll,{passive:true}); return ()=>window.removeEventListener("scroll",scroll); },[]);
 useEffect(() => {if(!open)return; const key=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);toggle.current?.focus();}}; document.addEventListener("keydown",key);return()=>document.removeEventListener("keydown",key);},[open]);
 return <header className={`site-header ${scrolled ? "compact" : ""}`}><div className="header-inner"><Link href="/" className="brand-link" aria-label="Swankey home" onClick={()=>setOpen(false)}><Image src="/brand/swankey-logo.png" width={2172} height={724} alt="Swankey" priority /></Link>
 <nav className="desktop-nav" aria-label="Primary">{links.map(l => l.href === "/product" ? <div className="nav-group" key={l.href}><Link href={l.href} aria-current={pathname===l.href?"page":undefined}>{l.label}</Link><div className="nav-dropdown"><Link href="/product">E498 electric jet</Link><Link href="/product#specifications">Specifications</Link><Link href="/contact?topic=oem">OEM / ODM</Link></div></div> : <Link key={l.href} href={l.href} aria-current={pathname===l.href?"page":undefined}>{l.label}</Link>)}</nav>
 <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(!open)}>{open ? "Close ×" : "Menu ☰"}</button></div>
 <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile" hidden={!open}>{links.map(l=><Link key={l.href} href={l.href} aria-current={pathname===l.href?"page":undefined} onClick={()=>setOpen(false)}>{l.label}</Link>)}<Link href="/dealers#apply" className="mobile-apply" onClick={()=>setOpen(false)}>Become a dealer</Link></nav></header>;
}
