import { Job } from '@/interfaces/profile';
import { JobCard } from './job-card';

interface Props {
  jobs: Job[];
}

export const JobsSection = ({ jobs }: Props) => {
  return (
    <section className="w-full sm:px-3 flex flex-col gap-8">
      <h2 className="text-3xl font-bold text-center my-6 text-blue-500 dark:text-light-green">
        Professional Experience
      </h2>
      <div className="flex flex-col gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
};
