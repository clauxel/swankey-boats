import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default async function AppleIcon() {
  const icon = await readFile(join(process.cwd(), "public/brand/swankey-icon.png"));
  return new ImageResponse(<div style={{display:"flex",width:"100%",height:"100%",background:"#07111c"}}><img alt="Swankey" src={`data:image/png;base64,${icon.toString("base64")}`} width={180} height={180}/></div>, size);
}
