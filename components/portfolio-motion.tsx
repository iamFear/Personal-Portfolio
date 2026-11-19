"use client";

import { useEffect } from "react";

export function PortfolioMotion() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".hero-stage");
    const prism = stage?.querySelector<HTMLElement>(".portrait-motion");
    const field = stage?.querySelector<HTMLElement>(".field-motion");
    if (!stage || !prism || !field) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let disposed = false;
    let revert: (() => void) | undefined;
    let started = false;

    const start = async () => {
      if (!motion.matches || disposed || started) return;
      started = true;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      revert = () => mm.revert();

      mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
        const x = gsap.quickTo(prism, "x", { duration: .58, ease: "power3.out" });
        const y = gsap.quickTo(prism, "y", { duration: .58, ease: "power3.out" });
        const rotate = gsap.quickTo(field, "rotation", { duration: .72, ease: "power3.out" });

        const move = (event: PointerEvent) => {
          const { left, top, width, height } = stage.getBoundingClientRect();
          if (!width || !height) return;
          const dx = ((event.clientX - left) / width - .5) * 2;
          const dy = ((event.clientY - top) / height - .5) * 2;
          x(dx * 14);
          y(dy * 11);
          rotate(dx * 4);
        };
        const reset = () => { x(0); y(0); rotate(0); };
        stage.addEventListener("pointermove", move, { passive: true });
        stage.addEventListener("pointerleave", reset, { passive: true });
        return () => {
          stage.removeEventListener("pointermove", move);
          stage.removeEventListener("pointerleave", reset);
        };
      });

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 761px)", () => {
        gsap.to(".hero-orbits", {
          y: 52, scale: .96, opacity: .56, ease: "none",
          scrollTrigger: { trigger: stage, start: "top top", end: "bottom top", scrub: .55 },
        });
        gsap.utils.toArray<HTMLElement>(".project-artwork").forEach((artwork) => {
          gsap.fromTo(artwork, { yPercent: -2 }, {
            yPercent: 2, ease: "none",
            scrollTrigger: { trigger: artwork.parentElement, start: "top bottom", end: "bottom top", scrub: .65 },
          });
        });
      });
    };

    const activate = () => { void start().catch(() => {}); };
    const frame = window.requestAnimationFrame(activate);
    motion.addEventListener("change", activate);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      motion.removeEventListener("change", activate);
      revert?.();
    };
  }, []);

  return null;
}
