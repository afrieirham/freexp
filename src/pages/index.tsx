import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/type";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { stringify } from "querystring";
import { ChangeEvent, useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";

const title = "Free XP — Gain experience with open-source projects!";
const description =
  "Contribute to open-source projects and get real-world experience as a software engineer.";

const fetcher: Fetcher<Project[], string> = (url: string) =>
  fetch(url).then((r) => r.json());

export const getStaticProps: GetStaticProps<{
  originalProjects: Project[];
}> = async () => {
  const res = await fetch("https://api.freexp.dev/projects");
  const originalProjects: Project[] = await res.json();
  return {
    props: {
      originalProjects: originalProjects.reverse(),
    },
    // revalidate every 1 minute
    revalidate: 60 * 1,
  };
};

export default function Home({
  originalProjects,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [sort, setSort] = useState(1);
  const [term, setTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>(originalProjects);

  const query = stringify({ term });
  const { data, isLoading } = useSWR("/api/projects?" + query, fetcher);

  let filterTimeout: NodeJS.Timeout;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => {
      setTerm(e.target.value);
    }, 500);
  };

  useEffect(() => {
    if (data) {
      setFirstLoad(false);
      const projectCopy = [...data];

      switch (sort) {
        case 1:
          setProjects(projectCopy.reverse());
          break;

        case 3:
          setProjects(projectCopy.sort((a, b) => a.name.localeCompare(b.name)));
          break;
        case 2:
        default:
          setProjects(projectCopy);
          break;
      }
    } else {
      setProjects(originalProjects);
    }
  }, [sort, data]);

  return (
    <div className="relative">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://freexp.dev/og.png" />
        <meta property="og:url" content="https://freexp.dev" />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute -z-10 h-full w-full left-0 blur-3xl bg-[url(/gradient.svg)]" />

      <div className="flex flex-col max-w-5xl px-4 mx-auto">
        <header className="mt-32 mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">
            Gain XPs with open-source projects.
          </h1>
          {/* <p className="mt-2 text-sm text-gray-200 opacity-50">
            Watch this free course "
            <a
              href="https://www.crushingit.tech/open-source"
              target="_blank"
              className="link"
            >
              Open Source: The Complete Guide
            </a>
            " by Frantz Kati.
          </p> */}
        </header>

        <div className="flex flex-col items-center justify-center w-full mb-8">
          <input
            type="text"
            placeholder="Search tech stack (e.g. Next.js, Laravel, React)"
            className="w-full max-w-lg text-sm input input-bordered input-secondary"
            onChange={onChange}
          />
        </div>

        <div className="flex items-center justify-end w-full">
          <select
            className="font-normal select select-bordered select-secondary"
            onChange={(e) => setSort(Number(e.target.value))}
          >
            <option value={1}>Recently added</option>
            <option value={2}>Earliest added</option>
            <option value={3}>Sort alphabetically (A-Z)</option>
          </select>
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {projects?.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                isLoading={!firstLoad && isLoading}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center w-full my-12">
          <a
            href="https://www.producthunt.com/posts/free-xp?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-free&#0045;xp"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=407942&theme=light"
              alt="Free&#0032;XP - Gain&#0032;experience&#0032;with&#0032;open&#0045;source&#0032;projects&#0033; | Product Hunt"
              style={{ width: "250px", height: "54px" }}
              width="250"
              height="54"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
