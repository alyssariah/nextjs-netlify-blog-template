import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../../components/Layout';
import BasicMeta from '../../../components/meta/BasicMeta';
import OpenGraphMeta from '../../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../../components/meta/TwitterCardMeta';
import TagDocList from '../../../components/TagDocList';
import config from '../../../lib/config';
import { countDocs, listDocContent, DocContent } from '../../../lib/docs';
import { getTag, listTags, TagContent } from '../../../lib/tags';
import Head from 'next/head';

type Props = {
  docs: DocContent[];
  tag: TagContent;
  page?: string;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ docs, tag, pagination, page }: Props) {
  const url = `/docs/tags/${tag.name}` + (page ? `/${page}` : '');
  const title = tag.name;
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <TagDocList docs={docs} tag={tag} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.slug as string[];
  const [slug, page] = [queries[0], queries[1]];
  const docs = listDocContent(page ? parseInt(page as string) : 1, config.posts_per_page, slug);
  const tag = getTag(slug);
  const pagination = {
    current: page ? parseInt(page as string) : 1,
    pages: Math.ceil(countDocs(slug) / config.posts_per_page),
  };
  const props: {
    docs: DocContent[];
    tag: TagContent;
    pagination: { current: number; pages: number };
    page?: string;
  } = { docs, tag, pagination };
  if (page) {
    props.page = page;
  }
  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listTags().flatMap((tag) => {
    const pages = Math.ceil(countDocs(tag.slug) / config.posts_per_page);
    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
            params: { slug: [tag.slug] },
          }
        : {
            params: { slug: [tag.slug, (page + 1).toString()] },
          }
    );
  });
  return {
    paths: paths,
    fallback: false,
  };
};
