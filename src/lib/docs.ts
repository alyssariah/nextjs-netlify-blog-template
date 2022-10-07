import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import yaml from 'js-yaml';

const docsDirectory = path.join(process.cwd(), 'content/docs');

export type DocContent = {
  readonly date: string;
  readonly title: string;
  readonly slug: string;
  readonly tags?: string[];
  readonly fullPath: string;
};

let docCache: DocContent[];

export function fetchDocContent(): DocContent[] {
  if (docCache) {
    return docCache;
  }
  // Get file names under /posts
  const fileNames = fs.readdirSync(docsDirectory);
  const allDocsData = fileNames
    .filter((it) => it.endsWith('.mdx'))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(docsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        date: string;
        title: string;
        tags: string[];
        slug: string;
        fullPath: string;
      };
      matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.mdx$/, '');

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error('slug field not match with the path of its content source');
      }

      return matterData;
    });
  // Sort posts by date
  docCache = allDocsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return docCache;
}

export function countDocs(tag?: string): number {
  return fetchDocContent().filter((it) => !tag || (it.tags && it.tags.includes(tag))).length;
}

export function listDocContent(page: number, limit: number, tag?: string): DocContent[] {
  return fetchDocContent();
  // .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
  // .slice((page - 1) * limit, page * limit);
}
