import Image from 'next/image';

import Tiptap from '@/components/rich-editor/tiptap';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { getPostContent } from '@/services/fetch-public';
import { ErrorPage } from '@/components/error-section';
import { NotFoundPage } from '@/components/not-found-section';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const slug = (await params).slug;
    const postContent = await getPostContent(slug);

    if (!postContent) {
      return (
        <NotFoundPage
          message={`Page with slug: "${slug}" not found`}
          suggestion="Please check the url"
        />
      );
    }

    const { title, content, image_url, updated_at, category_name } = postContent;

    return (
      <div className="w-full max-w-6xl flex flex-col mt-5 items-start md:items-center px-3">
        <h1 className="w-full font-montserrat text-2xl md:text-5xl font-bold !leading-[1.5] text-left dark:text-light-green text-blue-500 mt-8 mb-3">
          {title}
        </h1>
        <Badge className="font-firaCode lg:text-sm mb-8 self-start">{category_name}</Badge>
        <Image
          src={image_url}
          width={512}
          height={512}
          alt={title}
          className="object-cover w-full md:w-1/3 mb-10"
        />
        <div className="w-full font-firaCode flex justify-end text-sm md:text-xl mb-5 md:my-5 dark:text-light-gold text-light-blue">
          <span>Last updated: {formatDate(updated_at, true)}</span>
        </div>
        <Tiptap content={content} editable={false} />
      </div>
    );
  } catch (error: unknown) {
    console.error(JSON.stringify(error));

    return <ErrorPage message="Failed to load blog post" />;
  }
}
