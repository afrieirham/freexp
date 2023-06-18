export type Project = {
  id: number;
  name: string;
  description: string;
  slug: string;
  website: string;
  github: string;
  tags: string[];
  repos: Repo[];
};

export type Repo = {
  full_name: string;
  description: string;
  topics: string[];
  html_url: string;
  open_issues: number;
};
