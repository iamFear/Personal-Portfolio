import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { copy } from "../../../lib/content";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ file: "en.png" }, { file: "es.png" }];
}

export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const role = copy[file === "es.png" ? "es" : "en"].role;
  // Satori accepts TrueType here; the site itself serves WOFF2.
  const fontDir = join(process.cwd(), "assets/fonts");
  const [regular, bold, portrait] = await Promise.all([
    readFile(join(fontDir, "onest-400.ttf")),
    readFile(join(fontDir, "onest-800.ttf")),
    readFile(join(process.cwd(), "assets/portrait-share.png")),
  ]);

  return new ImageResponse(
    <div style={{ display: "flex", background: "linear-gradient(122deg, #0b0911 44%, #291643 100%)", color: "#f7f2ff", width: "100%", height: "100%", padding: 72, alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div style={{ fontSize: 104, fontWeight: 800, lineHeight: .91, letterSpacing: "-.065em", display: "flex", flexDirection: "column" }}>
          <span>Daniel</span><span>Burgoa<span style={{ color: "#bf9aff" }}>.</span></span>
        </div>
        <div style={{ fontSize: 34, color: "#d6baff" }}>{role}</div>
        <div style={{ fontSize: 21, color: "#bbb0cd" }}>Medellín, Colombia</div>
      </div>
      <div style={{ position: "relative", display: "flex", width: 435, height: 435, alignItems: "center", justifyContent: "center" }}>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width="435" height="435" viewBox="0 0 435 435" fill="none">
        <path d="M12 218h411M217 12v411" stroke="#594170" strokeDasharray="4 8"/>
        {[83, 105, 127, 149, 171].map((radius) => <ellipse key={radius} cx="217" cy="218" rx="199" ry={radius} transform="rotate(-25 217 218)" stroke="#8d61d0" />)}
        <ellipse cx="217" cy="218" rx="195" ry="115" transform="rotate(28 217 218)" stroke="#bf9aff" strokeDasharray="4 6" />
      </svg>
      {/* The OG renderer requires embedded image bytes rather than a browser URL. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${portrait.toString("base64")}`} alt="" width={246} height={246} style={{ borderRadius: 16, border: "2px solid #bf9aff" }} />
      </div>
    </div>,
    { width: 1200, height: 630, fonts: [
      { name: "Onest", data: regular, weight: 400, style: "normal" },
      { name: "Onest", data: bold, weight: 800, style: "normal" },
    ] },
  );
}
