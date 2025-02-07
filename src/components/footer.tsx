import { SocialMediaInfo } from './user-info/social-media';
import { getProfile } from '@/services/fetch-public';

export const Footer = async () => {
  try {
    const profile = await getProfile();

    return (
      <footer className="w-full mt-10 py-5 md:p-10 flex flex-col bg-blue-100 items-center justify-start md:justify-center border-t border-slate-400 dark:bg-light-blue">
        {profile && (
          <SocialMediaInfo
            socialMedia={profile.social_media}
            className="w-full justify-evenly md:justify-center [&>a>span]:hidden [&>a>span]:md:block"
          />
        )}
        <p className="my-9">{new Date().getFullYear()} © All rights reserved</p>
      </footer>
    );
  } catch (error: unknown) {
    console.error(JSON.stringify(error));

    return null;
  }
};
