import { SocialMedia } from '@/interfaces/profile';
import { SocialMediaInfo } from './social-media';

interface Props {
  socialMedia: SocialMedia;
}

export const Footer = ({ socialMedia }: Props) => {
  return (
    <footer className="w-full mt-10 py-5 md:p-10 flex bg-gray-200 items-center justify-start md:justify-center border-t-2 dark:bg-light-blue">
      <SocialMediaInfo
        socialMedia={socialMedia}
        className="w-full justify-evenly md:justify-center [&>a>span]:hidden [&>a>span]:md:block"
      />
    </footer>
  );
};
