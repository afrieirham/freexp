import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/type";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { stringify } from "querystring";
import { ChangeEvent, useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";

const title = "Free XP — Gain experience with open-source projects!";
const description =
  "Contribute to open-source projects and get real-world experience as a software engineer.";

const fetcher: Fetcher<Project[], string> = (url: string) =>
  fetch(url).then((r) => r.json());

export const getServerSideProps: GetServerSideProps<{
  serverProjects: Project[];
}> = async () => {
  const res = await fetch("https://api.freexp.dev/projects");
  const serverProjects = await res.json();
  return { props: { serverProjects } };
};

export default function Home({
  serverProjects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [sort, setSort] = useState(1);
  const [term, setTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>(serverProjects.reverse());

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

      <div className="flex flex-col max-w-5xl mx-auto px-4">
        <header className="mt-32 mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">
            Gain XPs with open-source projects.
          </h1>
          {/* <p className="text-gray-200 opacity-50 mt-2 text-sm">
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

        <div className="flex justify-center items-center w-full mb-8">
          <input
            type="text"
            placeholder="Search tech stack (e.g. Next.js, Laravel, React)"
            className="input input-bordered input-secondary text-sm w-full max-w-lg"
            onChange={onChange}
          />
        </div>

        <div className="flex w-full justify-end">
          <select
            className="select select-bordered select-secondary font-normal"
            onChange={(e) => setSort(Number(e.target.value))}
          >
            <option value={1}>Recently added</option>
            <option value={2}>Earliest added</option>
            <option value={3}>Sort alphabetically (A-Z)</option>
          </select>
        </div>

        <div className="mt-4 mb-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {projects?.map((p) => (
              <ProjectCard key={p.id} project={p} isLoading={isLoading} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
