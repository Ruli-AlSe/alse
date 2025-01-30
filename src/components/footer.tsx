import { SocialMedia } from '@/interfaces/profile';
import { SocialMediaInfo } from './user-info/social-media';

interface Props {
  socialMedia: SocialMedia;
}

export const Footer = ({ socialMedia }: Props) => {
  return (
    <footer className="w-full mt-10 py-5 md:p-10 flex bg-blue-100 items-center justify-start md:justify-center border-t border-slate-400 dark:bg-light-blue">
      <SocialMediaInfo
        socialMedia={socialMedia}
        className="w-full justify-evenly md:justify-center [&>a>span]:hidden [&>a>span]:md:block"
      />
    </footer>
  );
};
