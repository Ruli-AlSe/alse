'use server';

import { Blog, Post } from '@/interfaces/blog';
import { Profile } from '@/interfaces/profile';

const getPublic = async (path: string): Promise<Profile | Post[] | Post | undefined> => {
  const api = process.env.API_URL;
  const userEmail = process.env.USER_EMAIL;
  const url = path.includes('slug') ? `${api}${path}` : `${api}${path}/${userEmail}`;

  const data = await fetch(url)
    .then((res) => {
      if (!res.ok) {
        return undefined;
      }

      return res.json();
    })
    .catch((err) => {
      console.error(err);

      throw new Error('Failed to fetch data');
    });

  return data;
};

export const getProfile = async (): Promise<Profile | undefined> => {
  const data = (await getPublic('/profiles')) as Profile | undefined;

  return data;
};

export const getPosts = async (): Promise<Post[] | undefined> => {
  const data = (await getPublic('/posts')) as Blog | undefined;

  return data?.posts;
};

export const getPostContent = async (slug: string): Promise<Post | undefined> => {
  const data = (await getPublic(`/posts/slug/${slug}`)) as Post | undefined;

  return data;
};
