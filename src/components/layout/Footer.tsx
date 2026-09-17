import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
export function Footer() {
 return <footer className="site-footer"><section className="contact-banner"><Image src="/media/film-poster.jpg" fill sizes="100vw" alt="An open lake surrounded by islands" /><div><p className="overline">YOUR NEXT CHAPTER STARTS HERE</p><h2>See you on the water.</h2><Link className="action outline" href="/contact">Contact Swankey <span aria-hidden="true">↗</span></Link></div></section>
 <div className="contact-details"><div><p className="overline">GET IN TOUCH</p><h3>Let’s talk boats.</h3><a href={`mailto:${site.email}`}>{site.email}</a></div><div><p className="overline">BECOME A PARTNER</p><h3>Your market. Our boats.</h3><Link href="/dealers">Discover our dealer programme ↗</Link></div><div><p className="overline">OUR HOME</p><h3>Shenzhen, China.</h3><p>Electric thinking. Open horizons.</p></div></div>
 <div className="footer-bottom"><Link className="footer-brand" href="/" aria-label="Swankey home"><Image src="/brand/swankey-logo.png" width={2172} height={724} alt="Swankey" /></Link><p>© {new Date().getFullYear()} Swankey. All rights reserved.</p><div><Link href="/product">E498</Link><Link href="/dealers">Dealers</Link><Link href="/contact">Contact</Link><a href="#main" aria-label="Back to top">Back to top ↑</a></div></div></footer>;
}
