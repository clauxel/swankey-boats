import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/home/Hero";
import { FeatureSlider, ProductCarousel } from "@/components/home/Showcase";
import { buildMetadata } from "@/lib/metadata";
export const metadata = buildMetadata("home", "/");
const stories = [
  {tag:"THE BOAT", title:"A clear deck. A clear purpose.", text:"Meet the E498 electric jet bass boat.", image:"/media/e498-design.png", href:"/product"},
  {tag:"TECHNOLOGY", title:"Everything works together.", text:"Propulsion, control and station keeping.", image:"/media/lake-run.jpg", href:"/technology"},
  {tag:"PARTNERSHIPS", title:"Bring Swankey to your waters.", text:"Our European dealer programme.", image:"/media/fishing.jpg", href:"/dealers"},
  {tag:"OUR STORY", title:"A different kind of boat company.", text:"Electric thinking. Built in Shenzhen.", image:"/media/horizon.jpg", href:"/about"},
];
export default function HomePage() {
 return <main id="main"><HomeHero /><section className="brand-statement"><p>ENGINEERED FOR SHALLOW WATER. <span>BUILT FOR THE CAST.</span></p></section><ProductCarousel /><FeatureSlider />
 <section className="stories"><div className="section-heading"><p className="overline">EXPLORE OUR WORLD</p><h2>The Swankey experience.</h2><span className="heading-rule" /></div><div className="story-grid">{stories.map(s => <Link className="story-card" href={s.href} key={s.title}><div className="story-image"><Image src={s.image} width={600} height={400} alt="" /></div><div className="story-copy"><p className="story-tag">{s.tag}</p><h3>{s.title}</h3><p>{s.text}</p><span className="story-link">Explore <span aria-hidden="true">↗</span></span></div></Link>)}</div></section>
 </main>;
}
