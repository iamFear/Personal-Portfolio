import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { localeRoot, otherLocale, projectPath, projects, type Locale } from "../lib/content";

test("one click switches the whole homepage to Spanish and back", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("img", { name: "Daniel Burgoa" })).toBeVisible();
  await expect(page.getByText("Software developer", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Español" }).click();
  await expect(page).toHaveURL(/\/es\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { name: "Proyectos destacados" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Escríbeme por LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/danielburgoa/");
  await page.reload();
  await expect(page.getByRole("link", { name: "English" })).toBeVisible();
  await page.getByRole("link", { name: "English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("portrait responds to pointer and scroll while reduced motion stays still", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const portrait = page.locator(".portrait-motion");
  const artwork = page.locator(".project-artwork").first();
  await expect(artwork).toHaveAttribute("style", /transform:/);
  await page.mouse.move(1120, 365);
  await expect(portrait).toHaveAttribute("style", /translate3?d?\([^0]/);
  await page.evaluate(() => window.scrollTo(0, 360));
  await expect.poll(() => page.locator(".hero-orbits").evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m42)).toBeGreaterThan(10);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(portrait).toHaveCSS("transform", "none");
  await expect(artwork).toHaveCSS("transform", "none");
  expect(await page.locator(".field-bands").evaluate((element) => Number.parseFloat(getComputedStyle(element).animationDuration))).toBeLessThan(.001);
});

for (const locale of ["en", "es"] as const) {
  test(`each ${locale} case study is navigable and pairs to its translation`, async ({ page }) => {
    const other = otherLocale(locale);
    await page.goto(localeRoot(locale));
    await expect(page.locator("#work article")).toHaveCount(projects.length);

    for (const project of projects) {
      await page.locator(`#work a[href="${projectPath(locale, project.slug)}"]`).click();
      await expect(page.getByRole("heading", { level: 1, name: project[locale].title })).toBeVisible();
      await expect(page.getByRole("main").locator(`a[href="${project.repo}"]`)).toBeVisible();
      if (project.live) await expect(page.getByRole("main").locator(`a[href="${project.live}"]`)).toBeVisible();
      await page.locator(".language").click();
      await expect(page.locator("html")).toHaveAttribute("lang", other);
      await expect(page).toHaveURL(new RegExp(`${projectPath(other, project.slug)}$`));
      await expect(page.getByRole("heading", { level: 1, name: project[other].title })).toBeVisible();
      await page.locator(".language").click();
      await page.locator(".case-back").click();
      await expect(page).toHaveURL(new RegExp(`${localeRoot(locale)}#work$`));
    }
  });
}

test("CV downloads and the public file is a PDF", async ({ page, request }) => {
  await page.goto("/es/");
  const event = page.waitForEvent("download");
  await page.getByRole("link", { name: "Descargar CV (PDF en inglés)" }).first().click();
  expect((await event).suggestedFilename()).toBe("daniel-burgoa-resume.pdf");
  const cv = await request.get("/daniel-burgoa-resume.pdf");
  expect(cv.ok()).toBeTruthy();
  expect(cv.headers()["content-type"]).toContain("application/pdf");
  expect((await cv.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("keyboard skip link and MIDI controls work without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, reducedMotion: "reduce" });
  try {
    const page = await context.newPage();
    await page.goto("/work/launchpad-mixxx/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();
    await page.getByRole("radio", { name: "Decks" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("radio", { name: "Mixer & effects" })).toBeChecked();
    await expect(page.getByText("Master level · Headphone mix")).toBeVisible();
    await expect(page.getByText("Shared controls")).toBeHidden();
    await page.getByRole("link", { name: "Español" }).click();
    await expect(page.getByRole("heading", { name: "Dos modos, un controlador" })).toBeVisible();
  } finally {
    await context.close();
  }
});

test("static metadata, share cards, sitemap, and missing routes", async ({ page, request }) => {
  await page.goto("/es/proyectos/terra/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://portfolio.example/es/proyectos/terra/");
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", "https://portfolio.example/work/terra/");
  const response = await request.get("/share/es.png");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("image/png");
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("<loc>https://portfolio.example/es/proyectos/terra/</loc>");
  const missing = await page.goto("/work/not-a-project/");
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to the portfolio" })).toBeVisible();
});

const testedRoutes = (["en", "es"] as const).flatMap((locale: Locale) =>
  [localeRoot(locale), ...projects.map(({ slug }) => projectPath(locale, slug))],
);

test("no horizontal overflow at mobile, tablet, and desktop sizes", async ({ page }) => {
  test.setTimeout(60_000);
  for (const width of [320, 390, 680, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of testedRoutes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const size = await page.evaluate(() => ({ inner: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
      expect(size.scroll, `${width}px: ${route}`).toBeLessThanOrEqual(size.inner);
    }
  }
});

for (const route of ["/", "/es/", "/work/launchpad-mixxx/", "/es/proyectos/eficiencia-energetica/"]) {
  test(`automated accessibility checks: ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
}
