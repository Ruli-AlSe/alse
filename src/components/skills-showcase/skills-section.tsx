import { Competence } from '@/interfaces/profile';
import { TechCard } from './tech-card';
import { BlurredLight } from '../blurred-light';
import FadeContent from '../animations/fade-content';

interface Props {
  competences: Competence[];
}

export const SkillsSection = ({ competences }: Props) => {
  return (
    <section className="relative container mx-auto py-16">
      <FadeContent direction="vertical" className="w-full">
        <BlurredLight extraClasses="md:w-40 md:h-40 top-1/2 right-1/2 bg-blue-500 md:blur-[200px]" />
        <h2 className="font-montserrat text-2xl md:text-5xl font-bold !leading-[1.5] text-center mb-12 text-blue-500 dark:text-light-green">
          My Tech Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {competences.map((competence) => (
            <div key={competence.category_title} className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-blue-500 dark:text-light-gold">
                {competence.category_title}
              </h2>
              {competence.skills.map((skill) => (
                <TechCard key={skill.name} name={skill.name} icon={skill.icon_url} />
              ))}
            </div>
          ))}
        </div>
      </FadeContent>
    </section>
  );
};
