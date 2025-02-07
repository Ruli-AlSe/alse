import Image from 'next/image';

import { Card, CardContent } from '../ui/card';
import SpotlightContent from '../animations/spotlight-content';

interface Props {
  name: string;
  icon: string;
}

export const TechCard = ({ name, icon }: Props) => {
  return (
    <SpotlightContent className="bg-white dark:bg-dark-blue p-0 py-5">
      <Card className="bg-white dark:bg-dark-blue border-0 shadow-none">
        <CardContent className="flex flex-col items-center justify-center space-y-4 p-0">
          <Image src={icon} className="text-sm" alt={name} width={60} height={60} />
          <h3 className="font-firaCode text-xs lg:text-sm font-semibold text-center text-light-blue dark:text-light-gold">
            {name}
          </h3>
        </CardContent>
      </Card>
    </SpotlightContent>
  );
};
