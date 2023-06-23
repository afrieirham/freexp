import { Repo } from "@/type";
import Badge from "./Badge";

function RepositoryCard({ repo }: { repo: Repo }) {
  return (
    <div className="bg-neutral rounded-lg p-4 mt-4 border border-[#27242C]">
      <a
        href={repo?.html_url}
        target="_blank"
        className="text-primary font-medium hover:opacity-70"
      >
        {repo?.full_name}
      </a>
      <p className="text-gray-500 text-sm">{repo?.description}</p>
      <div className="card-actions mt-4">
        {repo?.topics?.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
      <a
        href={`${repo?.html_url}/issues`}
        target="_blank"
        className="btn btn-sm btn-block btn-outline btn-railway sm:w-auto text-xs normal-case mt-4"
      >
        {repo?.open_issues} quests available
      </a>
    </div>
  );
}

export default RepositoryCard;
