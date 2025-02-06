import { ArrowRight } from 'lucide-react';

import { ContentCard } from '@/components/content-card';
import { CustomButton } from '@/components/custom-button';
import { ErrorPage } from '@/components/error-section';
import { NotFoundPage } from '@/components/not-found-section';
import { getPosts } from '@/services/fetch-public';
import FadeContent from '@/components/animations/fade-content';

export default async function BlogPage() {
  try {
    const posts = await getPosts();

    if (!posts) {
      return (
        <NotFoundPage
          message={`No posts found`}
          suggestion="Please, try again later in case this is an error"
        />
      );
    }

    return (
      <main className="relative flex flex-col gap-8 items-start md:p-16 max-w-6xl">
        <h1 className="font-montserrat text-2xl md:text-5xl font-bold !leading-[1.5] text-center text-blue-500 dark:text-light-green">
          Things that have helped me!
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-10">
          {posts.map(
            ({ id, title, short_description, image_url, updated_at, category_name, slug }) => (
              <FadeContent key={id} direction="vertical" className="w-full">
                <ContentCard
                  title={title}
                  titleUrl={`/blog/${slug}`}
                  description={short_description}
                  imageUrl={image_url}
                  date={updated_at}
                  categoryName={category_name}
                  mainCta={
                    <CustomButton
                      icon={<ArrowRight />}
                      buttonText="Read more"
                      linkUrl={`/blog/${slug}`}
                    />
                  }
                />
              </FadeContent>
            )
          )}
        </div>
      </main>
    );
  } catch (error: unknown) {
    console.error(JSON.stringify(error));

    return <ErrorPage message="Failed to load blog posts" />;
  }
}
