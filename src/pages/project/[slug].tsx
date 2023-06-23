import RepositoryCard from "@/components/RepositoryCard";
import { Project } from "@/type";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

const apiUrl = "https://api.freexp.dev/projects";

export const getStaticProps: GetStaticProps<{ project: Project }> = async (
  context
) => {
  const slug = context.params?.slug;
  const project = await fetch(`${apiUrl}?slug=${slug}`).then((r) => r.json());
  const repoPromise = project[0].repos.map(async (url: string) =>
    fetch(url).then((r) => r.json())
  );

  const repos = await Promise.all(repoPromise);

  return {
    props: { project: { ...project[0], repos } },
    // revalidate every 24 hour
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects: Project[] = await fetch(`${apiUrl}/api/projects`).then((r) =>
    r.json()
  );
  const paths = projects.map((p) => ({ params: { slug: p.slug } }));

  return {
    paths,
    fallback: true,
  };
};

function Project({ project }: { project: Project }) {
  const title = `${project?.name} — ${project?.description} | FreeXP`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={project?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={project?.description} />
        <meta property="og:image" content="https://freexp.dev/og.png" />
        <meta property="og:url" content="https://freexp.dev" />
        <meta property="og:site_name" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col max-w-5xl mx-auto px-4">
        <h1 className="text-2xl mt-12 font-semibold text-primary">
          {project?.name}
        </h1>
        <p className="text-gray-200 opacity-50 mt-2">{project?.description}</p>
        <div className="text-xs mt-2 text-gray-300">
          <a
            className="cursor-pointer hover:text-gray-400 hover:underline"
            href={project?.website}
            target="_blank"
          >
            Website
          </a>
          {" • "}
          <a
            className="cursor-pointer hover:text-gray-400 hover:underline"
            href={project?.github}
            target="_blank"
          >
            GitHub
          </a>
        </div>
        <div className="my-4">
          {project?.repos?.map((r, i) => (
            <RepositoryCard key={i} repo={r} />
          ))}
        </div>
        <div className="mt-4 mb-12">
          <Link href="/" className="btn btn-ghost btn-xs normal-case">
            ← discover more open-source projects
          </Link>
        </div>
      </div>
    </>
  );
}

export default Project;
