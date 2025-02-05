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

interface Props {
  title: string;
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
  description,
  imageUrl,
  date,
  categoryName,
  technologies,
  mainCta,
  secondaryCta,
}: Props) {
  return (
    <Card className="overflow-hidden flex flex-col justify-between dark:bg-dark-blue">
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
          <CardDescription className="text-right text-dark-blue dark:text-white">
            {formatDate(date, true)}
          </CardDescription>
        )}
        {categoryName && (
          <Badge variant="default" className="w-fit mb-5">
            {categoryName}
          </Badge>
        )}
        <CardTitle className="text-blue-500 dark:text-light-green text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2 text-dark-blue dark:text-white">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {technologies && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
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
  );
}
