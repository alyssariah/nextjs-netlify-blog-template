import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import BasicMeta from '../../../components/meta/BasicMeta';
import OpenGraphMeta from '../../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../../components/meta/TwitterCardMeta';
import DocList from '../../../components/DocList';
import config from '../../../lib/config';
import { countDocs, listDocContent, DocContent } from '../../../lib/docs';
import { listTags, TagContent } from '../../../lib/tags';

type Props = {
  docs: DocContent[];
  tags: TagContent[];
  page: number;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Page({ docs, tags, pagination, page }: Props) {
  const url = `/docs/page/${page}`;
  const title = 'All docs';
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <DocList docs={docs} tags={tags} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params.page as string);
  const docs = listDocContent(page, config.posts_per_page);
  const tags = listTags();
  const pagination = {
    current: page,
    pages: Math.ceil(countDocs() / config.posts_per_page),
  };
  return {
    props: {
      page,
      docs,
      tags,
      pagination,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil(countDocs() / config.posts_per_page);
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    params: { page: (it + 2).toString() },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};
