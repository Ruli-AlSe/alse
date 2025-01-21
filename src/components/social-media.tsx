import { SocialMedia } from '@/interfaces/profile';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6';

export const SocialMediaInfo = ({
  socialMedia,
  className,
}: {
  socialMedia: SocialMedia;
  className?: string;
}) => {
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
    <div className="flex gap-4">
      {validSocialMedia.map((sm) => (
        <a
          key={sm}
          href={socialMedia[sm as keyof SocialMedia]!}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2 items-center hover:underline hover:underline-offset-4"
        >
          {getIcon(sm, className)}
          {sm.at(0)!.toUpperCase() + sm.slice(1)}
        </a>
      ))}
    </div>
  );
};
