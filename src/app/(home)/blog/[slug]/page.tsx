import Tiptap from '@/components/rich-editor/tiptap';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/interfaces/blog';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

const getPostContent = async (slug: string) => {
  const api = process.env.API_URL;
  const data: Post = await fetch(`${api}/posts/slug/${slug}`).then((res) => {
    if (!res.ok) {
      return undefined;
    }

    return res.json();
  });

  return data;
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const { title, content, image_url, category_name, updated_at } = await getPostContent(slug);

  return (
    <div className="w-full max-w-6xl flex flex-col mt-5 items-center px-3">
      <h1 className="w-full text-left text-2xl md:text-3xl dark:text-white text-dark-blue font-extrabold my-8">
        {title}
      </h1>
      <Image
        src={image_url}
        width={512}
        height={512}
        alt={title}
        className="object-cover w-full md:w-1/3 mb-10"
      />
      <div className="w-full h-16 flex flex-col md:flex-row items-start justify-between text-xl mb-5 md:my-5 dark:text-white text-dark-blue">
        <Badge className="text-xl">{category_name}</Badge>
        <span>{formatDate(updated_at, true)}</span>
      </div>
      <Tiptap content={content} editable={false} />
    </div>
  );
}
