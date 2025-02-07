import { Education } from '@/interfaces/profile';
import { AchievementCard } from './achievement-card';
import { BlurredLight } from '../blurred-light';
import FadeContent from '../animations/fade-content';

interface Props {
  educations: Education[];
}

export const EducationTimeline = ({ educations }: Props) => {
  return (
    <section className="container relative py-16">
      <FadeContent direction="vertical" className="w-full">
        <BlurredLight extraClasses="md:w-40 md:h-40 top-1/2 right-1/2 bg-blue-500 md:blur-[200px]" />
        <h2 className="font-montserrat text-2xl md:text-5xl font-bold !leading-[1.5] text-center mb-12 text-blue-500 dark:text-light-green">
          My Educational Journey
        </h2>
        <div className="space-y-8 px-3">
          {educations.map((achievement, index) => (
            <FadeContent
              key={index}
              direction="vertical"
              className="w-full"
              config={{ tension: 30, friction: 25 }}
            >
              <div key={index} className="flex">
                <div className="hidden lg:block w-1/2 pr-8">
                  {index % 2 === 0 && <AchievementCard {...achievement} />}
                </div>
                <div className="hidden lg:block w-px bg-dark-blue dark:bg-gray-700 relative">
                  <div className="absolute w-4 h-4 rounded-full bg-primary top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-gold dark:bg-light-gold"></div>
                </div>
                <div className="lg:w-1/2 lg:pl-8 w-full">
                  {index % 2 !== 0 && <AchievementCard {...achievement} />}
                  {index % 2 === 0 && (
                    <div className="lg:hidden">
                      <AchievementCard {...achievement} />
                    </div>
                  )}
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </FadeContent>
    </section>
  );
};
