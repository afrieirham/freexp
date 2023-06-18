import { Project } from "@/type";
import Link from "next/link";
import Badge from "./Badge";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card">
      <div className="card-body p-4 bg-neutral rounded">
        <Link
          href={`/project/${project.slug}`}
          className="card-title text-primary hover:text-primary-focus "
        >
          {project.name}
        </Link>
        <p className="text-sm text-violet-200 opacity-50">
          {project.description}
        </p>
        <div className="card-actions mt-2">
          {project.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
