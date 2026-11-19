import { notFound } from "next/navigation";
import { projects } from "./content";

export type ProjectParams = { params: Promise<{ slug: string }> };
export const projectParams = () => projects.map(({ slug }) => ({ slug }));

export async function projectFromParams(params: ProjectParams["params"]) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return project;
}
