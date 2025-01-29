import { CalendarDays, Briefcase } from 'lucide-react';

import { Job } from '@/interfaces/profile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { formatDate } from '@/lib/utils';
import { Badge } from '../ui/badge';
import Image from 'next/image';

export const JobCard = ({ job }: { job: Job }) => {
  const skills = job.skills;

  return (
    <Card className="w-full dark:bg-dark-blue">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold text-light-green">
              {job.company_name}
            </CardTitle>
            <CardDescription className="text-lg text-dark-gold dark:text-light-gold">
              {job.title}
            </CardDescription>
          </div>
          <div className="flex items-center text-sm text-dark-gold dark:text-light-gold">
            <CalendarDays className="mr-1 h-4 w-4" />
            {formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : 'Present'}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 flex items-center text-dark-blue dark:text-white">
              <Briefcase className="mr-2 h-5 w-5" />
              Key Responsibilities
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-light-blue dark:text-white">
              {job.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
          {skills.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-dark-blue dark:text-white">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="secondary"
                    className="flex justify-center items-center gap-3"
                  >
                    <Image src={skill.icon_url} alt={skill.name} width={20} height={20} />
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
