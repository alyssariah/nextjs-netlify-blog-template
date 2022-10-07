import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import BasicMeta from '../../components/meta/BasicMeta';
import OpenGraphMeta from '../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../components/meta/TwitterCardMeta';
import DocList from '../../components/DocList';
import config from '../../lib/config';
import { countDocs, listDocContent, DocContent } from '../../lib/docs';
import { listTags, TagContent } from '../../lib/tags';
import Link from 'next/link';

type Props = {
  docs: DocContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ docs, tags, pagination }: Props) {
  console.log('docs', docs);
  const url = '/docs';
  const title = 'All docs';
  return (
    <Layout>
      {/* <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} /> */}
      <div className="w-[100%] flex justify-start relative h-[100vh]">
        <div className="max-w-[350px] w-[100%] h-[100%] bg-grey-600 px-8 py-12">
          <h2 className="py-8 font-heading font-semibold text-heading-sm">ALTRO Documentation</h2>
          <ul className="flex flex-col space-y-4">
            {docs.map((doc, i) => (
              <li key={i}>
                {/* <Link href={'/docs/' + doc.slug}> */}
                <a href={'/docs/' + doc.slug}>
                  <h2 className="font-semibold hover:text-red-400">{doc.title}</h2>
                </a>
                {/* </Link> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const docs = listDocContent(1, config.posts_per_page);
  const tags = listTags();
  const pagination = {
    current: 1,
    pages: Math.ceil(countDocs() / config.posts_per_page),
  };
  return {
    props: {
      docs,
      tags,
      pagination,
    },
  };
};
