import Link from 'next/link';
import { TagContent } from '../lib/tags';

type Props = {
  tag: TagContent;
};
export default function Tag({ tag }: Props) {
  return (
    <Link href={'/docs/tags/[[...slug]]'} as={`/docs/tags/${tag.slug}`}>
      <a>{'#' + tag.name}</a>
    </Link>
  );
}
