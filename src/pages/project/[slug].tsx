import RepositoryCard from "@/components/RepositoryCard";
import { Project, Repo } from "@/type";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

const apiUrl = "https://api.freexp.dev/projects";
const accessToken = process.env.GITHUB_API_TOKEN;

export const getStaticProps: GetStaticProps<{ project: Project }> = async (
  context
) => {
  const slug = context.params?.slug;
  const project = await fetch(`${apiUrl}?slug=${slug}`).then((r) => r.json());
  const repoPromise = project[0]?.repos.map(async (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((r) => r.json())
  );

  const repos = (await Promise.all(repoPromise)) as Repo[];

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
      <div className="flex flex-col max-w-5xl px-4 mx-auto">
        <h1 className="mt-12 text-2xl font-semibold text-primary">
          {project?.name}
        </h1>
        <p className="mt-2 text-gray-200 opacity-50">{project?.description}</p>
        <div className="mt-2 text-xs text-gray-300">
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
          <Link href="/" className="normal-case btn btn-ghost btn-xs">
            ← discover more open-source projects
          </Link>
        </div>
      </div>
    </>
  );
}

export default Project;
