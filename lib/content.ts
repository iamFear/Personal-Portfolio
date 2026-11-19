export type Locale = "en" | "es";

export const profile = {
  name: "Daniel Burgoa",
  github: "https://github.com/iamFear",
  linkedin: "https://www.linkedin.com/in/danielburgoa/",
  resume: "/daniel-burgoa-resume.pdf",
};

export const localeRoot = (locale: Locale) => locale === "en" ? "/" : "/es/";
export const projectPath = (locale: Locale, slug: string) =>
  `${localeRoot(locale)}${locale === "en" ? "work" : "proyectos"}/${slug}/`;
export const otherLocale = (locale: Locale) => locale === "en" ? "es" : "en";

export const copy = {
  en: {
    skip: "Skip to content", mainNav: "Main navigation",
    work: "Work", experience: "Experience", contact: "Contact", language: "Español",
    role: "Software developer",
    location: "Medellín, Colombia",
    availability: "Open to software roles", founder: "Founder & CEO at Astodev",
    intro: "I build web applications and automate the work behind them. Four years in e-commerce operations taught me how to spot where software can make a difference.",
    viewWork: "Explore my work", cv: "Download CV", cvNote: "PDF in English",
    selected: "Selected work",
    workIntro: "Client work and personal builds across web development, creative coding, automation, and data.",
    allRepos: "All repositories",
    experienceIntro: "I came to software through operations. At The DJ Hookup, I worked across logistics and catalog analysis. At Astodev, I take that same practical approach to client problems and product decisions.",
    jobs: [
      {
        company: "Astodev", role: "Founder & Chief Executive Officer", time: "Aug 2026 – Present",
        body: "I lead strategy, business development, and technical direction. I work with clients to define software solutions around their operational needs and oversee product development.",
      },
      {
        company: "The DJ Hookup", role: "Operations Associate & Business Analyst", time: "Jul 2022 – Aug 2026",
        body: "I coordinated daily logistics and carrier communications, and analyzed data to guide catalog decisions. My e-commerce experience includes Magento and Shopify.",
      },
    ],
    stackTitle: "Tools I work with",
    studiesTitle: "Education & training",
    studies: [
      "Universidad EIA · One year of Systems Engineering coursework",
      "Codecademy · Fundamentals of Cybersecurity (2026)",
      "Udemy · The Complete JavaScript Course (2025)",
      "Udemy · Responsive Websites with HTML & CSS (2023)",
    ],
    contactTitle: "Let’s talk.",
    contactBody: "I’m open to software development roles. If your team builds web applications or makes complex workflows easier to use, I’d like to hear what you’re working on.",
    linkedin: "Message me on LinkedIn", backToTop: "Back to top",
    backToWork: "Back to work", repo: "View source on GitHub", live: "Visit live site",
    problem: "What I wanted to solve", build: "How I built it", result: "What it does today",
    next: "Next project",
    meta: "Daniel Burgoa is a software developer in Medellín, Colombia, working across web development, business automation, and data analysis.",
  },
  es: {
    skip: "Saltar al contenido", mainNav: "Navegación principal",
    work: "Proyectos", experience: "Experiencia", contact: "Contacto", language: "English",
    role: "Desarrollador de software",
    location: "Medellín, Colombia",
    availability: "Abierto a roles de desarrollo", founder: "Fundador y CEO de Astodev",
    intro: "Desarrollo aplicaciones web y automatizo procesos. Cuatro años en operaciones de comercio electrónico me enseñaron a detectar qué vale la pena automatizar.",
    viewWork: "Ver mis proyectos", cv: "Descargar CV", cvNote: "PDF en inglés",
    selected: "Proyectos destacados",
    workIntro: "Trabajo para clientes y proyectos propios de desarrollo web, programación creativa, automatización y datos.",
    allRepos: "Todos los repositorios",
    experienceIntro: "Llegué al desarrollo desde el área de operaciones. En The DJ Hookup trabajé en logística y análisis de catálogo. En Astodev uso ese mismo criterio práctico para resolver problemas de clientes y tomar decisiones de producto.",
    jobs: [
      {
        company: "Astodev", role: "Fundador y director ejecutivo", time: "Ago 2026 – Actualidad",
        body: "Lidero la estrategia, el desarrollo de negocio y la dirección técnica. Trabajo con clientes para definir soluciones de software según sus necesidades operativas y superviso el desarrollo de productos.",
      },
      {
        company: "The DJ Hookup", role: "Asociado de Operaciones y Analista de Negocio", time: "Jul 2022 – Ago 2026",
        body: "Coordiné la logística diaria y la comunicación con transportistas. También analicé datos para orientar decisiones de catálogo. Mi experiencia en comercio electrónico incluye Magento y Shopify.",
      },
    ],
    stackTitle: "Herramientas de trabajo",
    studiesTitle: "Educación y formación",
    studies: [
      "Universidad EIA · Un año de estudios en Ingeniería de Sistemas",
      "Codecademy · Fundamentos de ciberseguridad (2026)",
      "Udemy · Curso completo de JavaScript (2025)",
      "Udemy · Sitios web adaptables con HTML y CSS (2023)",
    ],
    contactTitle: "Hablemos.",
    contactBody: "Estoy abierto a oportunidades de desarrollo de software. Si tu equipo crea aplicaciones web o simplifica procesos complejos, me gustaría saber en qué está trabajando.",
    linkedin: "Escríbeme por LinkedIn", backToTop: "Volver arriba",
    backToWork: "Volver a proyectos", repo: "Ver código en GitHub", live: "Visitar el sitio",
    problem: "Qué quería resolver", build: "Cómo lo construí", result: "Qué hace hoy",
    next: "Siguiente proyecto",
    meta: "Daniel Burgoa es desarrollador de software en Medellín, Colombia. Trabaja en desarrollo web, automatización de procesos y análisis de datos.",
  },
} as const;

type ProjectText = {
  title: string;
  category: string;
  blurb: string;
  problem: string;
  build: string;
  result: string;
  proof: { value: string; label: string };
};

export type Project = {
  slug: string;
  art: "energy" | "terra" | "mixxx" | "prospecting" | "insurance";
  repo: string;
  live?: string;
  stack: readonly string[];
  en: ProjectText;
  es: ProjectText;
};

export const projects: readonly Project[] = [
  {
    slug: "eficiencia-energetica", art: "energy",
    repo: `${profile.github}/eficiencia-energetica-aplicada`,
    live: "https://eficiencia-energetica-aplicada.vercel.app/",
    stack: ["Astro", "TypeScript", "Vercel"],
    en: {
      title: "Eficiencia Energética Aplicada", category: "Web development · Client site",
      blurb: "A live website for a Colombian energy engineering firm, with a browsable archive of solar installations and a clear route to request an assessment.",
      problem: "The firm needed to explain technical services to households, institutions, and businesses. Visitors also needed a way to find examples relevant to their building before making an inquiry.",
      build: "At Astodev, I built the site with Astro and TypeScript. I structured the content so service and project detail pages can use shared templates. The repository includes a sitemap, a contact endpoint, and checks for site metadata.",
      result: "The live site presents the firm’s services and 18 installations, with photographs and technical details. Visitors can browse the project archive and submit an inquiry.",
      proof: { value: "18", label: "installation profiles on the live site" },
    },
    es: {
      title: "Eficiencia Energética Aplicada", category: "Desarrollo web · Sitio para cliente",
      blurb: "Un sitio para una empresa colombiana de ingeniería energética, con un catálogo de instalaciones solares y un formulario para solicitar un diagnóstico.",
      problem: "La empresa necesitaba explicar servicios técnicos a hogares, instituciones y negocios. Los visitantes también debían poder encontrar ejemplos relevantes para su inmueble antes de hacer una consulta.",
      build: "En Astodev desarrollé el sitio con Astro y TypeScript. Organicé el contenido para que las fichas de servicios y proyectos compartieran plantillas. El repositorio incluye un mapa del sitio, un endpoint de contacto y comprobaciones de metadatos.",
      result: "El sitio publicado presenta los servicios de la empresa y 18 instalaciones con fotografías y detalles técnicos. Los visitantes pueden consultar el catálogo y enviar una solicitud.",
      proof: { value: "18", label: "fichas de instalaciones en el sitio publicado" },
    },
  },
  {
    slug: "terra", art: "terra", repo: `${profile.github}/glamping-demo`, stack: ["Astro", "TypeScript", "CSS"],
    en: {
      title: "TERRA", category: "Web application · Demo",
      blurb: "A booking prototype for Colombian glamping businesses, with accommodation pages, a three-step reservation flow, and an owner dashboard.",
      problem: "A glamping operator needs to show guests what they can book and give them a clear path from browsing stays to making a reservation. I wanted a demo that showed both the guest journey and the owner’s side before committing to a backend.",
      build: "I used Astro and TypeScript to build accommodation pages, organize property and pricing data, and implement the reservation steps. The browser calculates the booking total and stores a reference locally. An owner dashboard shows how a backend could support the operator.",
      result: "The demo lets you complete a simulated reservation and explore the owner dashboard with sample data. It does not process payments or make live bookings. The repository documents the proposed backend separately.",
      proof: { value: "3", label: "steps in the booking flow" },
    },
    es: {
      title: "TERRA", category: "Aplicación web · Demo",
      blurb: "Un prototipo de reservas para glampings colombianos, con fichas de alojamiento, un flujo de tres pasos y un panel para propietarios.",
      problem: "Un glamping necesita mostrar qué alojamientos ofrece y facilitar el paso de la búsqueda a la reserva. Quería una demo que mostrara tanto la experiencia del huésped como la del propietario antes de implementar un backend.",
      build: "Usé Astro y TypeScript para crear las fichas, organizar los datos de alojamientos y precios e implementar el flujo de reserva. El navegador calcula el total y guarda una referencia local. El panel del propietario muestra cómo un backend podría dar soporte a la operación.",
      result: "La demo permite completar una reserva simulada y explorar el panel con datos de ejemplo. No procesa pagos ni crea reservas reales. El repositorio documenta por separado la propuesta de backend.",
      proof: { value: "3", label: "pasos en el flujo de reserva" },
    },
  },
  {
    slug: "launchpad-mixxx", art: "mixxx", repo: `${profile.github}/Launchpad-Mixxx-DJ`, stack: ["Python", "MIDI", "CoreMIDI"],
    en: {
      title: "Launchpad × Mixxx", category: "Creative coding · Hackathon",
      blurb: "A Python MIDI bridge that turns a Novation Launchpad MK2 into a two-deck DJ controller for Mixxx. An on-screen emulator works without the hardware.",
      problem: "I wanted to play a full Mixxx set with a Launchpad MK2 instead of a dedicated DJ controller. The same grid had to handle deck controls, mixing, and effects without losing track of which mode was active.",
      build: "I mapped pad presses to MIDI commands and used two profiles to switch between decks and mixer controls. Press-and-hold controls repeat in small steps; one-shot controls fire once. Mixxx still handles audio, and the bridge updates the Launchpad LEDs without feeding those updates back as input.",
      result: "Both the physical Launchpad and the on-screen emulator control Mixxx on macOS. The repository includes a scripted two-track transition, setup instructions, and tests for mapping and control behavior.",
      proof: { value: "2", label: "control profiles on one grid" },
    },
    es: {
      title: "Launchpad × Mixxx", category: "Programación creativa · Hackathon",
      blurb: "Un puente MIDI en Python que convierte un Novation Launchpad MK2 en un controlador de dos decks para Mixxx. El emulador funciona sin el dispositivo.",
      problem: "Quería mezclar una sesión completa en Mixxx con un Launchpad MK2, sin un controlador de DJ dedicado. La misma cuadrícula tenía que manejar los decks, la mezcla y los efectos sin confundir los modos.",
      build: "Asigné comandos MIDI a los botones y creé dos perfiles para alternar entre los decks y los controles de mezcla. Algunos comandos se repiten al mantener pulsado un botón; otros se ejecutan una sola vez. Mixxx sigue procesando el audio y el puente actualiza los LED sin interpretar esas actualizaciones como entradas.",
      result: "Tanto el Launchpad físico como el emulador controlan Mixxx en macOS. El repositorio incluye una transición programada entre dos pistas, instrucciones de configuración y pruebas de mapeo y de controles.",
      proof: { value: "2", label: "perfiles de control en una cuadrícula" },
    },
  },
  {
    slug: "ai-prospecting", art: "prospecting", repo: `${profile.github}/skill-encontrar-clientes`, stack: ["AI agents", "Markdown", "CSV"],
    en: {
      title: "AI Prospecting Skill", category: "Workflow automation · Personal",
      blurb: "A reusable agent workflow that verifies public sources, drafts tailored outreach, and keeps a record so the next research run does not repeat leads.",
      problem: "Prospecting work is easy to duplicate. If the source, contact route, and rationale disappear into a chat, the next research round starts from scratch.",
      build: "I defined a repeatable workflow that starts with company context, checks public sources, separates potential customers from partners, and ranks the results. The skill records sources and suggested next steps in a reusable register, using a spreadsheet or CSV according to what the agent can access.",
      result: "Each run targets ten prospective customers and five commercial partners. The workflow checks the existing register for duplicates and prepares drafts without sending them.",
      proof: { value: "10 + 5", label: "customer and partner prospects per run" },
    },
    es: {
      title: "Skill de prospección con IA", category: "Automatización · Proyecto personal",
      blurb: "Un flujo reutilizable para agentes de IA que verifica fuentes públicas, prepara mensajes personalizados y registra resultados para no repetir prospectos.",
      problem: "Es fácil duplicar el trabajo de prospección. Si la fuente, el canal de contacto y el motivo para contactar a una empresa se quedan en un chat, la siguiente ronda parte de cero.",
      build: "Definí un flujo que parte del contexto de la empresa, comprueba fuentes públicas, separa clientes potenciales de socios y prioriza los resultados. La skill guarda las fuentes y los próximos pasos en una hoja de cálculo o en archivos CSV, según el acceso del agente.",
      result: "Cada ejecución busca diez clientes potenciales y cinco socios comerciales. El flujo consulta el registro para evitar duplicados y prepara borradores sin enviarlos.",
      proof: { value: "10 + 5", label: "clientes y socios potenciales por ejecución" },
    },
  },
  {
    slug: "insurance-analysis", art: "insurance", repo: `${profile.github}/Insurance_Costs_Analysis`, stack: ["Python", "CSV"],
    en: {
      title: "Insurance Cost Analysis", category: "Data analysis · Practice project",
      blurb: "An exploratory Python project that parses a fictional insurance dataset and compares BMI across smoker and non-smoker groups.",
      problem: "Before drawing conclusions from a CSV, I wanted to check what the records contained and make the first comparison reproducible.",
      build: "I used Python’s standard-library CSV module to load the data, convert numeric fields, and group records. The initial inspection documented one exact duplicate in the source. The script keeps the input file unchanged.",
      result: "The current script reports average BMI for smokers and non-smokers and the relative difference. The dataset is fictional, and the comparison is descriptive. No predictive model has been implemented.",
      proof: { value: "1,338", label: "fictional records in the CSV" },
    },
    es: {
      title: "Análisis de costos de seguros", category: "Análisis de datos · Práctica",
      blurb: "Un proyecto exploratorio en Python que lee datos ficticios de seguros y compara el IMC entre personas fumadoras y no fumadoras.",
      problem: "Antes de sacar conclusiones de un CSV, quería inspeccionar los registros y asegurarme de que la primera comparación se pudiera reproducir.",
      build: "Usé el módulo CSV de la biblioteca estándar de Python para cargar los datos, convertir campos numéricos y agrupar registros. La inspección inicial documentó un duplicado exacto. El script no modifica el archivo original.",
      result: "El script calcula el IMC promedio de ambos grupos y la diferencia relativa. Los datos son ficticios y la comparación es descriptiva. No hay un modelo predictivo implementado.",
      proof: { value: "1.338", label: "registros ficticios en el CSV" },
    },
  },
];

export const skillGroups = [
  { en: "Web", es: "Web", items: ["TypeScript", "React", "Next.js", "Astro", "HTML", "CSS", "Web APIs", "SEO"] },
  { en: "Data", es: "Datos", items: ["Python", "SQL"] },
  { en: "Commerce", es: "Comercio", items: ["Shopify", "Magento"] },
] as const;
