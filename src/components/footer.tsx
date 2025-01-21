import { SocialMedia } from '@/interfaces/profile';
import { SocialMediaInfo } from './social-media';

export const Footer = ({ socialMedia }: { socialMedia: SocialMedia }) => {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <SocialMediaInfo socialMedia={socialMedia} className="w-6 h-6 text-green-700" />
    </footer>
  );
};
