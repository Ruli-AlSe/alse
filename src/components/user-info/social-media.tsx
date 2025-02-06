import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6';

import { SocialMedia } from '@/interfaces/profile';
import { cn } from '@/lib/utils';
import { BlurredLight } from '../blurred-light';

interface Props {
  socialMedia: SocialMedia;
  className?: string;
}

export const SocialMediaInfo = ({ socialMedia, className }: Props) => {
  const validSocialMedia = Object.keys(socialMedia).filter(
    (key) => socialMedia[key as keyof SocialMedia]
  );

  const getIcon = (key: string, className?: string) => {
    switch (key) {
      case 'facebook':
        return <FaFacebook className={className} />;
      case 'x':
        return <FaXTwitter className={className} />;
      case 'instagram':
        return <FaInstagram className={className} />;
      case 'linkedin':
        return <FaLinkedinIn className={className} />;
      case 'github':
        return <FaGithub className={className} />;
      case 'whatsapp':
        return <FaWhatsapp className={className} />;
    }
  };

  return (
    <div className={cn('relative flex gap-4 flex-wrap px-5', className)}>
      {validSocialMedia.map((sm) => (
        <a
          key={sm}
          href={socialMedia[sm as keyof SocialMedia]!}
          target="_blank"
          rel="noopener noreferrer"
          className="font-firaCode flex flex-col gap-2 items-center hover:underline hover:underline-offset-4"
        >
          {getIcon(sm, 'w-6 h-6 text-blue-500 dark:text-light-gold')}
          <span>{sm.at(0)!.toUpperCase() + sm.slice(1)}</span>
        </a>
      ))}
      <BlurredLight extraClasses="w-40 h-40 top-0 right-0 bg-blue-500 blur-[200px]" />
    </div>
  );
};
