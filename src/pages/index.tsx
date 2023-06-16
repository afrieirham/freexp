import { projects } from "@/data";
import Head from "next/head";

const title = "Free XP — Gain experience with open-source projects!";
const description =
  "Contribute to open-source projects and get real-world experience as a software engineer.";

export default function Home() {
  return (
    <>
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
      <div className="flex flex-col max-w-5xl mx-auto px-4">
        <header className="">
          <h1 className="text-3xl mt-12 font-black text-primary">
            Farm Free XPs 🧑‍🌾
          </h1>
          <p className="text-violet-200 opacity-50 mt-2">
            Contribute to open-source projects and get real-world experience
            working as a software engineer.
          </p>
          <p className="text-violet-200 opacity-50 mt-6 text-xs">
            Not convinced? Watch this free course "
            <a
              href="https://www.crushingit.tech/open-source"
              target="_blank"
              className="link"
            >
              Open Source: The Complete Guide
            </a>
            " by Frantz Kati.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-4 mt-6 mb-12 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((p) => (
            <div className="card rounded-md border border-neutral">
              <div className="card-body p-4">
                <h2 className="card-title">{p.name}</h2>
                <p className="text-sm text-violet-200 opacity-50">
                  {p.description}
                </p>
                <div className="card-actions mt-2 ">
                  {p.tags.map((t) => (
                    <div className="badge badge-primary badge-sm badge-outline rounded">
                      {t}
                    </div>
                  ))}
                </div>
                <div className="card-actions mt-2 ">
                  <a
                    href={p.questUrl}
                    target="_blank"
                    className="btn btn-sm text-sm normal-case btn-block btn-neutral"
                  >
                    View Quests
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
