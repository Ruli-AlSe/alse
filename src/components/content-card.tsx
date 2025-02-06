import { ReactElement } from 'react';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatDate } from '@/lib/utils';
import Link from 'next/link';
import SpotlightContent from './animations/spotlight-content';

interface Props {
  title: string;
  titleUrl?: string;
  description: string;
  date?: string;
  imageUrl?: string;
  categoryName?: string;
  technologies?: string[];
  mainCta: ReactElement;
  secondaryCta?: ReactElement;
}

export function ContentCard({
  title,
  titleUrl,
  description,
  imageUrl,
  date,
  categoryName,
  technologies,
  mainCta,
  secondaryCta,
}: Props) {
  const getCorrectTitle = () => {
    if (titleUrl) {
      return (
        <Link href={titleUrl} className="cursor-pointer">
          {title}
        </Link>
      );
    }
    return title;
  };

  return (
    <SpotlightContent className="bg-white dark:bg-dark-blue p-0">
      <Card className="flex flex-col justify-between dark:bg-dark-blue border-0 shadow-none h-full">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl || '/default/placeholder-image.png'}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="space-y-3">
          {date && (
            <CardDescription className="font-firaCode text-right text-light-blue dark:text-white">
              {formatDate(date, true)}
            </CardDescription>
          )}
          {categoryName && (
            <Badge
              variant="default"
              className="border border-blue-500 dark:border-light-gold bg-transparent text-light-blue dark:text-white font-firaCode w-fit mb-5"
            >
              {categoryName}
            </Badge>
          )}
          <CardTitle className="font-montserrat text-xl md:text-2xl font-bold !leading-[1.5] text-blue-500 dark:text-light-green hover:opacity-80">
            {getCorrectTitle()}
          </CardTitle>
          <CardDescription className="line-clamp-3 md:line-clamp-2 text-dark-blue dark:text-white text-sm md:text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {technologies && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="font-firaCode">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter
          className={cn('flex flex-col md:flex-row', {
            'justify-end items-end': !secondaryCta,
            'justify-between': !!secondaryCta,
          })}
        >
          {secondaryCta}
          {mainCta}
        </CardFooter>
      </Card>
    </SpotlightContent>
  );
}
