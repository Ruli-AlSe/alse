import Tiptap from '@/components/rich-editor/tiptap';
import { Post } from '@/interfaces/blog';

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
  const post = await getPostContent(slug);

  return (
    <div className="w-full max-w-6xl flex flex-col">
      <h1>Text editor</h1>
      <Tiptap content={post.content} />
    </div>
  );
}
