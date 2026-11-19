const orbitBands = [
  [282, 128, -23], [285, 139, -23], [288, 151, -23],
  [293, 164, -23], [297, 177, -23], [301, 192, -23],
  [306, 207, -23], [310, 221, -23], [318, 239, -23],
] as const;

const fieldDots = [
  [88, 124], [144, 67], [431, 59], [525, 97], [601, 163], [54, 237],
  [567, 437], [594, 334], [130, 417], [266, 492], [519, 472], [208, 87],
  [55, 385], [437, 501], [104, 336], [573, 122], [112, 99], [481, 78],
  [377, 53], [632, 218], [78, 190], [564, 402], [166, 466], [291, 89],
] as const;

export function PortraitField() {
  return <svg className="portrait-field" aria-hidden="true" viewBox="0 0 660 550" fill="none">
    <defs>
      <linearGradient id="orbit-tone" x1="0" y1="96" x2="650" y2="463" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4f239a" stopOpacity=".22" />
        <stop offset=".46" stopColor="#9b61ff" />
        <stop offset=".71" stopColor="#c9a5ff" />
        <stop offset="1" stopColor="#4e288a" stopOpacity=".3" />
      </linearGradient>
      <pattern id="field-grid" width="36" height="36" patternUnits="userSpaceOnUse">
        <path d="M36 0H0V36" stroke="#ad82fc" strokeOpacity=".12" />
      </pattern>
      <radialGradient id="field-mask">
        <stop offset=".46" stopColor="white" />
        <stop offset="1" stopColor="black" />
      </radialGradient>
      <mask id="grid-edge"><rect x="0" y="0" width="660" height="550" fill="url(#field-mask)" /></mask>
    </defs>
    <rect width="660" height="550" mask="url(#grid-edge)" fill="url(#field-grid)" />
    <g className="field-bands" stroke="url(#orbit-tone)">
      {orbitBands.map(([rx, ry, turn], i) => <ellipse key={rx} cx="329" cy="273" rx={rx} ry={ry} transform={`rotate(${turn} 329 273)`} opacity={i % 3 === 0 ? ".63" : ".34"} />)}
      <ellipse cx="329" cy="273" rx="300" ry="111" transform="rotate(26 329 273)" opacity=".48" strokeDasharray="3 5" />
    </g>
    {fieldDots.map(([x, y], index) => <circle key={x} cx={x} cy={y} r={index % 5 === 0 ? 1.65 : .85} fill="#d2b0ff" opacity={index % 5 === 0 ? ".8" : ".46"} />)}
    <path d="M88 152v12m-6-6h12M565 358v12m-6-6h12M466 78v16m-8-8h16M178 444v12m-6-6h12" stroke="#c3a0ff" strokeOpacity=".69" />
  </svg>;
}
