'use server';

import { Profile } from '@/interfaces/profile';

export const getProfile = async (): Promise<Profile> => {
  const api = process.env.API_URL;
  const userEmail = process.env.USER_EMAIL;
  const data: Profile = await fetch(`${api}/profiles/${userEmail}`).then((res) => res.json());

  return data;
};
