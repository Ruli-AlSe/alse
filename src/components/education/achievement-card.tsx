import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award } from 'lucide-react';
import { Education } from '@/interfaces/profile';

export const AchievementCard = ({
  career,
  school_name,
  end_date,
  is_course,
  relevant_topics,
}: Education) => {
  const IconComponent = is_course ? Award : GraduationCap;
  const badge = is_course ? 'Specialization course' : 'Professional carreer';

  return (
    <Card className="w-full bg-white dark:bg-dark-blue shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center space-x-2 sm:space-x-4 p-2 lg:p-6">
        <div className="w-12 h-9 sm:h-12 rounded-full bg-primary flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold text-light-green">{career}</CardTitle>
          <p className="text-sm text-dark-gold dark:text-light-gold">{school_name}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-2 gap-2">
          <Badge className="dark:bg-light-blue dark:text-light-gold w-fit">{badge}</Badge>
          <span className="text-sm text-dark-gold dark:text-light-gold">{end_date}</span>
        </div>
        {relevant_topics.map((topic) => (
          <p key={topic} className="text-sm mt-2">
            - {topic}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};
