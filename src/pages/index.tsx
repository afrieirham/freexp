import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/type";
import Head from "next/head";
import { stringify } from "querystring";
import { ChangeEvent, useState } from "react";
import useSWR, { Fetcher } from "swr";

const title = "Free XP — Gain experience with open-source projects!";
const description =
  "Contribute to open-source projects and get real-world experience as a software engineer.";

const fetcher: Fetcher<Project[], string> = (url: string) =>
  fetch(url).then((r) => r.json());

export default function Home() {
  const [term, setTerm] = useState("");
  const query = stringify({ term });

  const { data, isLoading } = useSWR("/api/projects?" + query, fetcher);

  let filterTimeout: NodeJS.Timeout;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => {
      setTerm(e.target.value);
    }, 500);
  };

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

        <div className="flex justify-center items-center w-full mb-16">
          <input
            type="text"
            placeholder="Search tech stack (e.g. Next.js, Laravel, React)"
            className="input input-bordered input-secondary text-sm w-full max-w-lg"
            onChange={onChange}
          />
        </div>

        <div className="mt-4 mb-12">
          {isLoading ? (
            <div className="flex w-full justify-center items-center mt-20">
              <span className="loading loading-dots loading-md mx-auto" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {data?.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
