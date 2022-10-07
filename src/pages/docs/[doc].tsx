import { GetStaticProps, GetStaticPaths } from 'next';
import renderToString from 'next-mdx-remote/render-to-string';
import { MdxRemote } from 'next-mdx-remote/types';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import { fetchDocContent } from '../../lib/docs';
import fs from 'fs';
import yaml from 'js-yaml';

import InstagramEmbed from 'react-instagram-embed';
import YouTube from 'react-youtube';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Layout from '../../components/Layout';
import { listDocContent, DocContent } from '../../lib/docs';
import Link from 'next/link';
import clsx from 'clsx';

export type Props = {
  title: string;
  dateString: string;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  source: MdxRemote.Source;
  docs: DocContent[];
};

const components = { InstagramEmbed, YouTube, TwitterTweetEmbed };
const slugToDocContent = ((docContents) => {
  let hash = {};
  docContents.forEach((it) => (hash[it.slug] = it));
  return hash;
})(fetchDocContent());

export default function Doc({
  title,
  dateString,
  slug,
  tags,
  author,
  description = '',
  source,
  docs,
}: Props) {
  const content = hydrate(source, { components });
  return (
    // <DocLayout
    //   title={title}
    //   date={parseISO(dateString)}
    //   slug={slug}
    //   tags={tags}
    //   author={author}
    //   description={description}
    // >
    //   {content}
    // </DocLayout>
    <Layout>
      <div className="w-[100%] flex justify-center relative h-[calc(100vh-55px)] bg-grey-800">
        <div className="absolute top-0 right-0 w-[50%] bg-grey-900 h-[100%] z-1"></div>
        <div className="flex w-[100%] justify-start max-w-[1440px]">
          <div className="max-w-[350px] w-[100%] h-[100%] bg-grey-800 p-8 overflow-scroll">
            <h2 className="pb-6 font-heading font-semibold text-heading-sm leading-8">
              ALTRO Documentation
            </h2>
            <ul className="flex flex-col space-y-4">
              {docs.map((doc, i) => (
                <li key={i}>
                  <Link href={'/docs/' + doc.slug}>
                    <a href={'/docs/' + doc.slug}>
                      <h2
                        className={clsx('font-semibold hover:text-red-400', {
                          ['text-red-400']: doc.slug == slug,
                        })}
                      >
                        {doc.title}
                      </h2>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[100%] max-w-[1220px] overflow-scroll bg-grey-900 z-[10]">
            <article className="p-16">
              <header>
                <h1 className="font-heading font-semibold text-heading-md">{title}</h1>
              </header>
              <div className="text-grey-50">{content}</div>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchDocContent().map((it) => '/docs/' + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.doc as string;
  const source = fs.readFileSync(slugToDocContent[slug].fullPath, 'utf8');
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object },
  });
  const mdxSource = await renderToString(content, { components, scope: data });
  const docs = listDocContent(1, 4);
  return {
    props: {
      docs: docs,
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      description: '',
      tags: data.tags,
      author: data.author,
      source: mdxSource,
    },
  };
};
