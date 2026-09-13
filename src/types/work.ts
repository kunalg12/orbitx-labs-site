export interface CaseStudy {
  slug: string;
  title: string;
  category: "AI Agent" | "Web Platform" | "Mobile App" | "Software";
  year: number;
  client: string;
  heroImage?: string;
  thumbnailImage?: string;
  emoji: string;
  color: string;
  accentColor: string;
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  outcomes: { metric: string; label: string }[];
  tech: string[];
  url?: string;
  featured: boolean;
}
