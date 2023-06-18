import RepositoryCard from "@/components/RepositoryCard";
import { projects } from "@/data";
import Head from "next/head";
import { useRouter } from "next/router";

function Project() {
  const router = useRouter();
  const slug = router.query.slug;

  const data = projects.find((p) => p.slug === slug);

  if (!data) {
    return "Loading...";
  }

  const title = `${data.name} — ${data.description} | FreeXP`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={data.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content="https://freexp.dev/og.png" />
        <meta property="og:url" content="https://freexp.dev" />
        <meta property="og:site_name" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col max-w-5xl mx-auto px-4">
        <h1 className="text-3xl mt-12 font-black text-primary">{data.name}</h1>
        <p className="text-violet-200 opacity-50 mt-2">{data.description}</p>
        <div className="text-xs mt-2 text-violet-300">
          <a className="link" href={data.website} target="_blank">
            Website
          </a>
          {" | "}
          <a className="link" href={data.github} target="_blank">
            GitHub
          </a>
        </div>
        <div className="my-4">
          {data.repos.map((r, i) => (
            <RepositoryCard key={i} url={r} />
          ))}
        </div>
        <div className="mt-4 mb-12">
          <a href="/" className="btn btn-ghost btn-xs normal-case">
            ← discover more open-source projects
          </a>
        </div>
      </div>
    </>
  );
}

export default Project;
