import { readdir, readFile } from "fs/promises";
import path from "path";
import type { CaseStudy } from "@/types/work";

const WORK_DIR = path.join(process.cwd(), "src/content/work");

export async function getAllWork(): Promise<CaseStudy[]> {
  try {
    const files = await readdir(WORK_DIR);
    const all = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          const raw = await readFile(path.join(WORK_DIR, f), "utf-8");
          return JSON.parse(raw) as CaseStudy;
        })
    );
    return all.sort((a, b) => b.year - a.year);
  } catch {
    return [];
  }
}

export async function getWorkBySlug(
  slug: string
): Promise<CaseStudy | null> {
  const all = await getAllWork();
  return all.find((w) => w.slug === slug) ?? null;
}

export async function getFeaturedWork(): Promise<CaseStudy[]> {
  const all = await getAllWork();
  return all.filter((w) => w.featured);
}
