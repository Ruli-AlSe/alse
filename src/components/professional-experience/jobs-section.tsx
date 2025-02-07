import { Job } from '@/interfaces/profile';
import { JobCard } from './job-card';
import { BlurredLight } from '../blurred-light';
import FadeContent from '../animations/fade-content';

interface Props {
  jobs: Job[];
}

export const JobsSection = ({ jobs }: Props) => {
  return (
    <section className="w-full relative flex flex-col gap-8">
      <FadeContent direction="vertical" className="w-full">
        <BlurredLight extraClasses="lg:w-60 lg:h-60 top-1/4 left-0 bg-blue-500 lg:blur-[300px]" />
        <BlurredLight extraClasses="lg:w-60 lg:h-60 top-3/4 left-2/3 bg-blue-500 lg:blur-[300px]" />
        <h2 className="font-montserrat text-2xl md:text-5xl font-bold !leading-[1.5] text-center my-6 text-blue-500 dark:text-light-green">
          Professional Experience
        </h2>
        <div className="w-full flex flex-col gap-8">
          {jobs.map((job) => (
            <FadeContent key={job.id} direction="vertical" className="w-full">
              <JobCard job={job} />
            </FadeContent>
          ))}
        </div>
      </FadeContent>
    </section>
  );
};
