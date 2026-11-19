import type { Locale } from "../lib/content";

const routing = {
  en: {
    title: "Two layouts, one controller",
    intro: "Switch profiles to see which part of Mixxx the same pads control. This diagram maps controls; it doesn’t play audio.",
    group: "Control profile", decks: "Decks", mixer: "Mixer & effects",
    deckGroups: ["Deck A", "Deck B", "Shared controls"],
    deckItems: ["Load · Play · Cue · Sync", "Load · Play · Cue · Sync", "Headphones · Crossfader"],
    mixerGroups: ["Channels", "Master", "Effects"],
    mixerItems: ["Faders · Mute · PFL", "Master level · Headphone mix", "Enable · Mix · Parameter"],
  },
  es: {
    title: "Dos modos, un controlador",
    intro: "Cambia de perfil para ver qué parte de Mixxx controlan los mismos botones. Este diagrama muestra las funciones; no reproduce audio.",
    group: "Perfil de control", decks: "Decks", mixer: "Mezcla y efectos",
    deckGroups: ["Deck A", "Deck B", "Controles comunes"],
    deckItems: ["Cargar · Reproducir · Cue · Sync", "Cargar · Reproducir · Cue · Sync", "Auriculares · Crossfader"],
    mixerGroups: ["Canales", "Salida principal", "Efectos"],
    mixerItems: ["Faders · Silencio · PFL", "Volumen · Mezcla de auriculares", "Activar · Mezcla · Parámetro"],
  },
} as const;

export function MidiStudy({ locale }: { locale: Locale }) {
  const t = routing[locale];
  return <section className="midi-study" aria-labelledby="midi-title">
    <h2 id="midi-title">{t.title}</h2>
    <p>{t.intro}</p>
    <fieldset className="midi-board">
      <legend>{t.group}</legend>
      <div className="midi-controls">
        <label><input type="radio" name="profile" value="decks" defaultChecked /> <span>{t.decks}</span></label>
        <label><input type="radio" name="profile" value="mixer" /> <span>{t.mixer}</span></label>
      </div>
      <dl className="midi-profile midi-decks">
        {t.deckGroups.map((group, i) => <div key={group}><dt>{group}</dt><dd>{t.deckItems[i]}</dd></div>)}
      </dl>
      <dl className="midi-profile midi-mixer">
        {t.mixerGroups.map((group, i) => <div key={group}><dt>{group}</dt><dd>{t.mixerItems[i]}</dd></div>)}
      </dl>
    </fieldset>
  </section>;
}
