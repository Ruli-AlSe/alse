import { ContentCard } from '@/components/content-card';
import { CustomButton } from '@/components/custom-button';
import { Blog } from '@/interfaces/blog';
import { ArrowRight } from 'lucide-react';

const getPosts = async (): Promise<Blog> => {
  const api = process.env.API_URL;
  const userEmail = process.env.USER_EMAIL;
  const data: Blog = await fetch(`${api}/posts/${userEmail}`).then((res) => res.json());

  return data;
};

export default async function BlogPage() {
  const { posts } = await getPosts();

  return (
    <div className="w-full px-3 md:p-6 mt-10 max-w-6xl">
      <h1 className="text-3xl font-bold text-center text-blue-500 dark:text-light-green">
        Things that have helped me!
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-10">
        {posts.map((post) => (
          <ContentCard
            key={post.id}
            title={post.title}
            description={post.short_description}
            imageUrl={post.image_url}
            date={post.updated_at}
            categoryName={post.category_name}
            mainCta={
              <CustomButton
                icon={<ArrowRight />}
                buttonText="Read more"
                linkUrl={`/blog/${post.slug}`}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
