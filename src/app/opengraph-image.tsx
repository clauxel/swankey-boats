import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const dynamic = "force-static";
export const alt = "Swankey — Go shallow. Fish further.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const [logo, boat] = await Promise.all(["brand/swankey-logo.png", "media/e498-equipped.png"].map(file => readFile(join(process.cwd(), "public", file))));
  return new ImageResponse(<div style={{display:"flex",position:"relative",width:"100%",height:"100%",background:"#091827",padding:60,color:"white",flexDirection:"column"}}>
    <img alt="Swankey" src={`data:image/png;base64,${logo.toString("base64")}`} width={280} height={93}/>
    <div style={{display:"flex",fontSize:76,fontWeight:700,letterSpacing:-3,lineHeight:1.05,marginTop:45,flexDirection:"column"}}><span>Go shallow.</span><span style={{color:"#6cbcf2"}}>Fish further.</span></div>
    <img alt="E498 design" src={`data:image/png;base64,${boat.toString("base64")}`} width={640} height={427} style={{position:"absolute",right:0,bottom:0}}/>
    <div style={{position:"absolute",bottom:55,left:60,fontSize:20,letterSpacing:3,color:"#a4bbcd"}}>E498 · ELECTRIC JET BASS BOAT</div>
  </div>, size);
}
