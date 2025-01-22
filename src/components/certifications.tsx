import { Education } from '@/interfaces/profile';

interface Props {
  educations: Education[];
}

export const Certifications = ({ educations }: Props) => {
  return (
    <section className="w-full px-3 flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Certifications</h2>
      <div className="flex flex-col gap-8">
        {educations.map((education) => (
          <div key={education.id} className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">{education.career}</h3>
            <p className="text-sm">{education.school_name}</p>
            <p className="text-sm">
              {education.start_date} - {education.end_date}
            </p>
            <p className="text-sm">{education.location}</p>
            {
              <ul className="flex flex-col gap-2">
                {education.relevant_topics.map((topic) => (
                  <li key={topic} className="text-sm">
                    {topic}
                  </li>
                ))}
              </ul>
            }
          </div>
        ))}
      </div>
    </section>
  );
};
