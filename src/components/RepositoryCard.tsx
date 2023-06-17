import { useEffect, useState } from "react";
import Badge from "./Badge";

type Repo = {
  full_name: string;
  description: string;
  topics: string[];
  html_url: string;
  open_issues: number;
};

function RepositoryCard({ url }: { url: string }) {
  const [repo, setRepo] = useState<null | Repo>(null);

  useEffect(() => {
    const get = async () => {
      const data = await fetch(url).then((r) => r.json());
      setRepo(data);
    };

    get();
  }, []);

  return (
    <div className="bg-neutral rounded p-4 mt-4">
      <p className="text-primary font-bold">{repo?.full_name}</p>
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
