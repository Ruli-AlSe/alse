import { Education } from '@/interfaces/profile';
import { AchievementCard } from './achievement-card';

interface Props {
  educations: Education[];
}

export const EducationTimeline = ({ educations }: Props) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-light-green">
        My Educational Journey
      </h2>
      <div className="space-y-8">
        {educations.map((achievement, index) => (
          <div key={index} className="flex">
            <div className="hidden md:block w-1/2 pr-8">
              {index % 2 === 0 && <AchievementCard {...achievement} />}
            </div>
            <div className="hidden md:block w-px bg-dark-blue dark:bg-gray-700 relative">
              <div className="absolute w-4 h-4 rounded-full bg-primary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-gold dark:bg-light-gold"></div>
            </div>
            <div className="md:w-1/2 md:pl-8 w-full">
              {index % 2 !== 0 && <AchievementCard {...achievement} />}
              {index % 2 === 0 && (
                <div className="md:hidden">
                  <AchievementCard {...achievement} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
