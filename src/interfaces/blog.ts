export interface Blog {
  posts: Post[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  slug: string;
  short_description: string;
  credits: Credits;
  category_name: string;
  created_at: string;
  updated_at: string;
}

export interface Credits {
  link_url: string;
  page_name: string;
  user_name: string;
}
