import RepositoryCard from "@/components/RepositoryCard";
import { projects } from "@/data";
import { useRouter } from "next/router";

function Project() {
  const router = useRouter();
  const slug = router.query.slug;

  const data = projects.find((p) => p.slug === slug);

  if (!data) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4">
      <h1 className="text-3xl mt-12 font-black text-primary">{data.name}</h1>
      <p className="text-violet-200 opacity-50 mt-2">{data.description}</p>
      <div className="text-xs mt-2 text-violet-300">
        <a className="link" href={data.website} target="_blank">
          Website
        </a>{" "}
        |{" "}
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
  );
}

export default Project;
