import { CaseStudy } from "../../../../../components/site";
import { pageMetadata } from "../../../../../lib/metadata";
import { projectFromParams, projectParams, type ProjectParams } from "../../../../../lib/project-routes";

export const generateStaticParams = projectParams;
export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectParams) {
  return pageMetadata("es", await projectFromParams(params));
}

export default async function Page({ params }: ProjectParams) {
  return <CaseStudy locale="es" project={await projectFromParams(params)} />;
}
