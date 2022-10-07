import React from 'react';
import { DocContent } from '../lib/docs';
import DocItem from './DocItem';
import TagLink from './TagLink';
import Pagination from './Pagination';
import { TagContent } from '../lib/tags';

type Props = {
  docs: DocContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function DocList({ docs, tags, pagination }: Props) {
  return (
    <div className="max-w-[400px] w-[100%] h-[100vh] bg-grey-700 px-8 py-16">
      <ul className="flex flex-col space-y-8">
        {docs.map((it, i) => (
          <li key={i}>
            <DocItem doc={it} />
          </li>
        ))}
      </ul>
    </div>
  );
}
