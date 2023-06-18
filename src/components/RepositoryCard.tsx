import { Repo } from "@/type";
import Badge from "./Badge";

function RepositoryCard({ repo }: { repo: Repo }) {
  return (
    <div className="bg-neutral rounded p-4 mt-4">
      <a
        href={repo?.html_url}
        className="text-primary font-bold hover:text-primary-focus"
      >
        {repo?.full_name}
      </a>
      <p className="text-violet-200 text-sm">{repo?.description}</p>
      <div className="card-actions mt-4">
        {repo?.topics?.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
      <a
        href={`${repo?.html_url}/issues`}
        target="_blank"
        className="btn btn-sm btn-block sm:w-auto text-xs normal-case btn-primary mt-4"
      >
        {repo?.open_issues} quests available
      </a>
    </div>
  );
}

export default RepositoryCard;
