import { SocialMediaInfo } from './user-info/social-media';
import { getProfile } from '@/app/services/get-profile';

export const Footer = async () => {
  const { social_media } = await getProfile();

  return (
    <footer className="w-full mt-10 py-5 md:p-10 flex bg-blue-100 items-center justify-start md:justify-center border-t border-slate-400 dark:bg-light-blue">
      <SocialMediaInfo
        socialMedia={social_media}
        className="w-full justify-evenly md:justify-center [&>a>span]:hidden [&>a>span]:md:block"
      />
    </footer>
  );
};
