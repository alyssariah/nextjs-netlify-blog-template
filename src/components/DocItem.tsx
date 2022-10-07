import { DocContent } from '../lib/docs';
import Date from './Date';
import Link from 'next/link';
import { parseISO } from 'date-fns';

type Props = {
  doc: DocContent;
};
export default function DocItem({ doc }: Props) {
  return (
    <Link href={'/docs/' + doc.slug}>
      <a className="">
        <h2 className="font-semibold text-grey-900">{doc.title}</h2>
      </a>
    </Link>
  );
}
