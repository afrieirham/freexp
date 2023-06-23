import { Project } from "@/type";
import Link from "next/link";
import Badge from "./Badge";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/project/${project.slug}`} className="min-h-[150px]">
      <div className="flex flex-col h-full p-4 bg-neutral hover:bg-[#211F2C] rounded-lg border border-[#27242C]">
        <p className="font-medium  text-primary">{project.name}</p>
        <p className="text-sm text-gray-500 line-clamp-3 mt-2">
          {project.description}
        </p>
        <div className="card-actions mt-2">
          {project.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
