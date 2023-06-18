import { Project } from "@/type";
import type { NextApiRequest, NextApiResponse } from "next";

const apiUrl = "https://api.freexp.dev/projects";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[]>
) {
  const { term } = req.query;
  const data = await fetch(`${apiUrl}?q=${term}`).then((r) => r.json());
  res.status(200).json(data as Project[]);
}
