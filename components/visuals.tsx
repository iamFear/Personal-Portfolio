import type { Project } from "../lib/content";

const icons = {
  external: <path d="M5 15 15 5M6 5h9v9" />,
  right: <path d="M3 10h14m-6-6 6 6-6 6" />,
  left: <path d="M17 10H3m6 6-6-6 6-6" />,
  down: <path d="M10 3v14m-6-6 6 6 6-6" />,
  up: <path d="M10 17V3m6 6-6-6-6 6" />,
  download: <path d="M10 2.5v10m-4-4 4 4 4-4M3.5 13v4h13v-4" />,
  globe: <><circle cx="10" cy="10" r="7.5" /><ellipse cx="10" cy="10" rx="3.25" ry="7.5" /><path d="M2.5 10h15" /></>,
  pin: <><path d="M15.5 8c0 4-5.5 9-5.5 9S4.5 12 4.5 8a5.5 5.5 0 1 1 11 0Z" /><circle cx="10" cy="8" r="1.6" /></>,
};

export function Icon({ name }: { name: keyof typeof icons }) {
  return <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">{icons[name]}</svg>;
}

export function Mark() {
  return <svg aria-hidden="true" viewBox="0 0 36 36" className="brand-mark">
    <path d="M4 5.5h11a12.5 12.5 0 0 1 0 25H4zm15 6 11-6v25l-11-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="32" cy="18" r="2" fill="currentColor" />
  </svg>;
}

// Reproducible from the project's insurance.csv: BMI buckets [12,16), …, [52,56).
// Points use within-group shares, keeping the different group sizes comparable.
const bmiGroups = [
  { total: 274, counts: [0, 9, 31, 57, 67, 54, 35, 15, 5, 0, 1], color: "#f7bc9e" },
  { total: 1064, counts: [1, 31, 116, 221, 265, 227, 133, 49, 17, 3, 1], color: "#d1adff" },
];

export function ProjectArt({ kind }: { kind: Project["art"] }) {
  return (
    <svg className={`project-art art-${kind}`} aria-hidden="true" viewBox="0 0 640 364" width="640" height="364" fill="none" preserveAspectRatio="xMidYMid slice">
      {kind === "terra" && <>
        <rect width="640" height="364" fill="#173e31" />
        <circle cx="452" cy="137" r="89" fill="#e2ebaa" />
        <path d="M0 254 140 132 245 221 331 155 552 364H0Z" fill="#2c604a" />
        <path d="m133 364 189-171 189 171Z" fill="#0d271f" />
        <path d="m179 364 143-142 143 142M220 364l102-103 102 103m-162 0 60-63 60 63" stroke="#bacb8a" strokeWidth="1.5" />
        <path d="M0 309c73-14 136-7 198 22m249 12c78-24 131-29 193-18M0 332c59-18 122-10 168 10m291 10c70-17 137-25 181-15M3 354c56-11 91-12 130 3" stroke="#67a584" strokeWidth="1.25" opacity=".75" />
        <path d="M44 69V43h26m500 0h26v26M44 295v26h26m500 0h26v-26" stroke="#e2ebaa" strokeOpacity=".6" />
        <text x="54" y="100" fill="#e2ebaa" fontSize="28" fontWeight="700" letterSpacing="4">TERRA</text>
      </>}
      {kind === "mixxx" && <>
        <rect width="640" height="364" fill="#20143d" />
        <circle cx="320" cy="182" r="165" stroke="#aa82f5" strokeOpacity=".46" />
        <circle cx="320" cy="182" r="135" stroke="#aa82f5" strokeOpacity=".35" />
        <path d="M35 182h570M320 15v334" stroke="#aa82f5" strokeDasharray="3 6" strokeOpacity=".55" />
        <g transform="translate(211 73)">
          <rect width="218" height="218" rx="15" fill="#342258" stroke="#ae88f0" />
          {Array.from({ length: 64 }, (_, i) => {
            const lit = [0, 1, 6, 7, 8, 11, 12, 15, 18, 21, 26, 29, 33, 38, 40, 43, 44, 47, 48, 50, 53, 55, 56, 57, 62, 63].includes(i);
            const fill = !lit ? "#493269" : i % 3 === 0 ? "#ead5ff" : i % 3 === 1 ? "#ffb7a7" : "#a678f4";
            return <rect key={i} width="19" height="19" x={15 + i % 8 * 24} y={15 + Math.floor(i / 8) * 24} rx="3" fill={fill} />;
          })}
        </g>
        <path d="M90 132v100m-10-70h20m450-30v100m-10-30h20" stroke="#e0b9ff" strokeWidth="2" />
      </>}
      {kind === "prospecting" && <>
        <rect width="640" height="364" fill="#251634" />
        <path d="M0 92h640M0 182h640M0 272h640M124 0v364M320 0v364M516 0v364" stroke="#76539b" strokeDasharray="2 5" />
        <circle cx="320" cy="182" r="128" stroke="#664685" />
        <path d="M122 182h80q32 0 32-32v-10q0-30 30-30h197m-227 72v47q0 28 30 28h197" stroke="#cfa6ff" strokeWidth="2" />
        <circle cx="122" cy="182" r="29" fill="#cfa6ff" />
        <path d="M111 182h22m-11-11v22" stroke="#251634" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => <rect key={i} x={380 + (i % 5) * 31} y={75 + Math.floor(i / 5) * 38} width="22" height="22" rx="2" fill="#cfa6ff" />)}
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={380 + i * 31} y="246" width="22" height="22" rx="2" fill="#251634" stroke="#cfa6ff" />)}
      </>}
      {kind === "insurance" && <>
        <rect width="640" height="364" fill="#281d2b" />
        <path d="M96 66v222h449M96 109h449M96 153h449M96 198h449M96 243h449" stroke="#a68aab" strokeOpacity=".52" strokeDasharray="3 5" />
        <path d="M96 66v222h449" stroke="#b394b7" strokeWidth="1.5" />
        {bmiGroups.map(({ total, color, counts }, series) => {
          const points = counts.map((count, i) => [115 + 41 * i, Number((288 - count / total * 810).toFixed(1))]);
          return <g key={color}>
            <polyline points={points.map((point) => point.join(",")).join(" ")} stroke={color} strokeWidth="2.5" strokeDasharray={series ? "6 5" : undefined} />
            {points.map(([x, y]) => <circle key={x} cx={x} cy={y} r={series ? "3" : "4"} fill={series ? "#281d2b" : color} stroke={color} strokeWidth="1.5" />)}
          </g>;
        })}
        <g fill="#d1b4d7" fontSize="13" textAnchor="middle">
          <text x="115" y="316">14</text><text x="238" y="316">26</text><text x="361" y="316">38</text><text x="484" y="316">50</text>
        </g>
      </>}
    </svg>
  );
}
