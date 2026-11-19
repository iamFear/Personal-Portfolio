import Link from "next/link";
import Image from "next/image";
import { copy, localeRoot, otherLocale, profile, projectPath, projects, skillGroups, type Locale, type Project } from "../lib/content";
import { Icon, Mark, ProjectArt } from "./visuals";
import { MidiStudy } from "./midi-study";
import { PortraitField } from "./portrait-field";
import { PortfolioMotion } from "./portfolio-motion";

function Resume({ locale, variant = "text-link" }: { locale: Locale; variant?: string }) {
  const t = copy[locale];
  return <a className={variant} href={profile.resume} download hrefLang="en" aria-label={`${t.cv} (${t.cvNote})`}>
    {t.cv} <Icon name="download" />
  </a>;
}

function Header({ locale, switchTo }: { locale: Locale; switchTo: string }) {
  const t = copy[locale];
  const home = localeRoot(locale);
  const targetLocale = otherLocale(locale);
  return <>
    <a className="skip-link" href="#content">{t.skip}</a>
    <header className="masthead" id="top">
      <div className="wrap masthead-inner">
        <Link href={home} className="brand"><Mark /><span>{profile.name}</span></Link>
        <nav aria-label={t.mainNav} className="main-nav">
          <Link href={`${home}#work`}>{t.work}</Link>
          <Link href={`${home}#experience`}>{t.experience}</Link>
          <Link href={`${home}#contact`}>{t.contact}</Link>
        </nav>
        <a className="language" href={switchTo} hrefLang={targetLocale} lang={targetLocale}>
          <Icon name="globe" /> {t.language}
        </a>
      </div>
    </header>
  </>;
}

function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <footer className="footer" id="contact">
    <div className="contact-field" aria-hidden="true" />
    <div className="wrap">
      <div className="contact-grid">
        <h2 className="contact-title">{t.contactTitle}</h2>
        <div className="contact-copy">
          <p>{t.contactBody}</p>
          <a className="button button-contact" href={profile.linkedin}>{t.linkedin} <Icon name="external" /></a>
        </div>
      </div>
      <div className="footer-bar">
        <span className="footer-name"><Mark /> {profile.name}</span>
        <div className="footer-links">
          <a className="text-link" href={profile.github}>GitHub <Icon name="external" /></a>
          <Resume locale={locale} />
        </div>
        <a className="text-link back-top" href="#top">{t.backToTop} <Icon name="up" /></a>
      </div>
    </div>
  </footer>;
}

function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <section className="hero-stage" aria-labelledby="name">
    <div className="wrap">
      <div className="hero">
        <div className="hero-copy">
          <h1 id="name" className="display-name"><span>Daniel</span>{" "}<span>Burgoa<span className="name-dot" aria-hidden="true">.</span></span></h1>
          <p className="hero-role">{t.role}</p>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">{t.viewWork} <Icon name="down" /></a>
            <Resume locale={locale} variant="button button-outline" />
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbits" aria-hidden="true"><div className="field-motion"><PortraitField /></div></div>
          <figure className="portrait-motion">
            <div className="portrait-frame">
              <Image unoptimized preload className="hero-photo" src="/media/daniel-burgoa.webp" alt={profile.name} width={400} height={400} />
              <div className="portrait-light" aria-hidden="true" />
            </div>
            <svg viewBox="0 0 320 320" preserveAspectRatio="none" className="portrait-reticle" aria-hidden="true" fill="none">
              <path d="M1 30V1h29m260 0h29v29m0 260v29h-29m-260 0H1v-29" stroke="currentColor" vectorEffect="non-scaling-stroke" />
            </svg>
          </figure>
        </div>
      </div>
      <div className="hero-rail">
        <p className="availability"><span aria-hidden="true" />{t.availability}</p>
        <p className="location"><Icon name="pin" /> {t.location}</p>
        <a className="rail-link" href="https://www.astodev.com/nosotros/">{t.founder} <Icon name="external" /></a>
      </div>
    </div>
  </section>;
}

function Work({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <section className="work wrap" id="work" aria-labelledby="work-title">
    <div className="section-heading">
      <div><h2 id="work-title">{t.selected}</h2><p>{t.workIntro}</p></div>
      <a className="text-link github-link" href={profile.github}>{t.allRepos} <Icon name="external" /></a>
    </div>
    <div className="project-grid">
      {projects.map((project, index) => {
        const d = project[locale];
        return <article className={`project project-${project.art}${project.live ? " project-feature" : ""}`} key={project.slug}>
          <Link className="project-link" href={projectPath(locale, project.slug)}>
            <ProjectPreview project={project} />
            <div className="project-copy">
              <div className="project-heading">
                <h3>{d.title}</h3>
                <span className="project-arrow"><Icon name="external" /></span>
              </div>
              <div className="project-meta"><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p className="category">{d.category}</p></div>
              <p className="project-summary">{d.blurb}</p>
            </div>
          </Link>
        </article>;
      })}
    </div>
  </section>;
}

function ProjectPreview({ project }: { project: Project }) {
  return <div className="project-plate">
    <div className="project-artwork">{project.art === "energy"
      ? <Image unoptimized className="project-art project-screenshot" src="/media/eea-project.webp" alt="" width={1280} height={820} />
      : <ProjectArt kind={project.art} />}</div>
  </div>;
}

function Experience({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <section className="experience" id="experience" aria-labelledby="experience-title">
    <div className="wrap experience-grid">
      <div className="experience-lead">
        <h2 id="experience-title">{t.experience}</h2><p>{t.experienceIntro}</p><Resume locale={locale} />
      </div>
      <div>
        <ol className="timeline">
          {t.jobs.map((job) => <li key={job.company}>
            <p className="job-date">{job.time}</p>
            <h3>{job.company === "Astodev" ? <a href="https://www.astodev.com/nosotros/">{job.company} <Icon name="external" /></a> : job.company}</h3>
            <p className="job-role">{job.role}</p>
            <p className="job-body">{job.body}</p>
          </li>)}
        </ol>
        <div className="credentials">
          <div>
            <h3>{t.stackTitle}</h3>
            <dl className="skill-list">{skillGroups.map((group) => <div key={group.en}>
              <dt>{group[locale]}</dt><dd>{group.items.join(", ")}</dd>
            </div>)}</dl>
          </div>
          <div>
            <h3>{t.studiesTitle}</h3>
            <ul className="studies">{t.studies.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

export function Portfolio({ locale }: { locale: Locale }) {
  return <>
    <Header locale={locale} switchTo={localeRoot(otherLocale(locale))} />
    <main id="content" tabIndex={-1}>
      <Hero locale={locale} />
      <Work locale={locale} />
      <Experience locale={locale} />
      <PortfolioMotion />
    </main>
    <Footer locale={locale} />
  </>;
}

export function CaseStudy({ locale, project }: { locale: Locale; project: Project }) {
  const t = copy[locale];
  const d = project[locale];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <>
    <Header locale={locale} switchTo={projectPath(otherLocale(locale), project.slug)} />
    <main id="content" tabIndex={-1} className="case-main wrap">
      <Link className="text-link case-back" href={`${localeRoot(locale)}#work`}><Icon name="left" /> {t.backToWork}</Link>
      <header className="case-header">
        <div>
          <h1>{d.title}</h1>
          <p className="category">{d.category}</p>
          <p className="case-summary">{d.blurb}</p>
          <div className="case-actions">
            {project.live ? <a className="button button-primary" href={project.live} hrefLang="es">{t.live} <Icon name="external" /></a> : null}
            <a className={`button ${project.live ? "button-outline" : "button-primary"}`} href={project.repo}>{t.repo} <Icon name="external" /></a>
          </div>
        </div>
        <figure>
          <ProjectPreview project={project} />
          {project.art === "insurance" ? <figcaption className="chart-caption">{locale === "en"
            ? "Fictional dataset: BMI distribution by smoking status. Solid line: smokers. Dashed line: non-smokers."
            : "Datos ficticios: distribución del IMC por grupo. Línea continua: fumadores. Línea discontinua: no fumadores."}</figcaption> : null}
        </figure>
      </header>
      <div className="case-body">
        <aside className="case-facts">
          <p className="proof-value">{d.proof.value}</p><p className="proof-label">{d.proof.label}</p>
          <ul className="stack-tags" aria-label={t.stackTitle}>{project.stack.map((tech) => <li key={tech}>{tech === "AI agents" && locale === "es" ? "Agentes de IA" : tech}</li>)}</ul>
        </aside>
        <div className="case-narrative">
          <section><h2>{t.problem}</h2><p>{d.problem}</p></section>
          <section><h2>{t.build}</h2><p>{d.build}</p></section>
          {project.art === "mixxx" ? <MidiStudy locale={locale} /> : null}
          <section><h2>{t.result}</h2><p>{d.result}</p></section>
        </div>
      </div>
      <Link className="next-project" href={projectPath(locale, next.slug)}>
        <div><span>{t.next}</span><strong>{next[locale].title}</strong></div><Icon name="right" />
      </Link>
    </main>
    <Footer locale={locale} />
  </>;
}
