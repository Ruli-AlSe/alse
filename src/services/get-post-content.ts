'use server';

import { Post } from '@/interfaces/blog';

export const getPostContent = async (slug: string): Promise<Post | undefined> => {
  const api = process.env.API_URL;
  const data = await fetch(`${api}/posts/slug/${slug}`).then((res) => {
    if (!res.ok) {
      return undefined;
    }

    return res.json();
  });

  return data;
};
