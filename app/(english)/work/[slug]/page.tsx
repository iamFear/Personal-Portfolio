import { CaseStudy } from "../../../../components/site";
import { pageMetadata } from "../../../../lib/metadata";
import { projectFromParams, projectParams, type ProjectParams } from "../../../../lib/project-routes";

export const generateStaticParams = projectParams;
export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectParams) {
  return pageMetadata("en", await projectFromParams(params));
}

export default async function Page({ params }: ProjectParams) {
  return <CaseStudy locale="en" project={await projectFromParams(params)} />;
}
