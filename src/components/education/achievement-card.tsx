import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award } from 'lucide-react';
import { Education } from '@/interfaces/profile';
import { formatDate } from '@/lib/utils';
import SpotlightContent from '../animations/spotlight-content';

export const AchievementCard = ({
  career,
  school_name,
  end_date,
  start_date,
  is_course,
  relevant_topics,
}: Education) => {
  const IconComponent = is_course ? Award : GraduationCap;
  const badge = is_course ? 'Specialization course' : 'Professional carreer';

  return (
    <SpotlightContent className="bg-white dark:bg-dark-blue !p-0 py-5">
      <Card className="w-full border-0 bg-white dark:bg-dark-blue shadow-none">
        <CardHeader className="flex flex-row items-center space-x-2 sm:space-x-4 p-2 lg:p-6">
          <div className="w-12 h-9 sm:h-12 rounded-full bg-primary flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="font-poppins text-xl font-bold text-blue-500 dark:text-light-green">
              {career}
            </CardTitle>
            <p className="font-firaCode text-sm text-light-blue dark:text-light-gold">
              {school_name}
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-2 gap-2">
            <Badge className="font-firaCode border border-blue-500 dark:border-light-gold bg-transparent text-light-blue dark:text-white w-fit">
              {badge}
            </Badge>
            <div>
              {!is_course && (
                <span className="font-firaCode text-sm text-light-blue dark:text-light-gold">
                  {formatDate(start_date)} -{' '}
                </span>
              )}
              <span className="font-firaCode text-sm text-light-blue dark:text-light-gold">
                {formatDate(end_date)}
              </span>
            </div>
          </div>
          {relevant_topics.map((topic) => (
            <p key={topic} className="text-sm mt-2">
              - {topic}
            </p>
          ))}
        </CardContent>
      </Card>
    </SpotlightContent>
  );
};
