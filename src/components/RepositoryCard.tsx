import { Repo } from "@/type";
import Badge from "./Badge";

function RepositoryCard({ repo }: { repo: Repo }) {
  return (
    <div className="bg-neutral rounded-lg p-4 mt-4 border border-[#27242C]">
      <a
        href={repo.html_url}
        target="_blank"
        className="font-medium text-primary hover:opacity-70"
      >
        {repo.full_name}
      </a>
      <p className="text-sm text-gray-500">{repo.description}</p>
      <div className="mt-4 card-actions">
        {repo.topics?.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
      <a
        href={`${repo.html_url}/issues`}
        target="_blank"
        className="mt-4 text-xs normal-case btn btn-sm btn-block btn-outline btn-railway sm:w-auto"
      >
        {repo.open_issues} quests available
      </a>
    </div>
  );
}

export default RepositoryCard;
