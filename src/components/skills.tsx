import Image from 'next/image';

import { Competence } from '@/interfaces/profile';

interface Props {
  competences: Competence[];
}

export const Skills = ({ competences }: Props) => {
  return (
    <section className="w-full px-3 flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Skills</h2>
      <div className="flex flex-col gap-8">
        {competences.map((competence) => (
          <div key={competence.category_title} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{competence.category_title}</h2>
            {competence.skills.map((skill) => (
              <div key={skill.id} className="flex gap-4 items-center">
                <Image
                  src={skill.icon_url}
                  className="text-sm"
                  alt={skill.name}
                  width={60}
                  height={60}
                />
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
