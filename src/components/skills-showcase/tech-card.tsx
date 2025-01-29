import Image from 'next/image';

import { Card, CardContent } from '../ui/card';

interface Props {
  name: string;
  icon: string;
}

export const TechCard = ({ name, icon }: Props) => {
  return (
    <Card className="w-full bg-white dark:bg-dark-blue shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
        <Image src={icon} className="text-sm" alt={name} width={60} height={60} />
        <h3 className="text-xs lg:text-sm font-semibold text-center text-dark-gold dark:text-light-gold">
          {name}
        </h3>
      </CardContent>
    </Card>
  );
};
