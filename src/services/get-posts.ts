'use server';

import { Blog, Post } from '@/interfaces/blog';

export const getPosts = async (): Promise<Post[]> => {
  const api = process.env.API_URL;
  const userEmail = process.env.USER_EMAIL;
  const data: Blog = await fetch(`${api}/posts/${userEmail}`).then((res) => res.json());

  return data.posts;
};
