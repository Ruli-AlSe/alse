import { Job } from '@/interfaces/profile';

export const ProfessionalExperience = ({ jobs }: { jobs: Job[] }) => {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Professional Experience</h2>
      <div className="flex flex-col gap-8">
        {jobs.map((job) => (
          <div key={job.id} className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm">{job.company_name}</p>
            <p className="text-sm">
              {job.start_date} - {job.end_date}
            </p>
            <p className="text-sm">{job.job_type}</p>
            {
              <ul className="flex flex-col gap-2">
                {job.activities.map((activity) => (
                  <li key={activity} className="text-sm">
                    {activity}
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
