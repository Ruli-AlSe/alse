import { EducationTimeline } from '@/components/education/timeline';
import { Presentation } from '@/components/user-info/presentation';
import { JobsSection } from '@/components/professional-experience/jobs-section';
import { SkillsSection } from '@/components/skills-showcase/skills-section';
import { SocialMediaInfo } from '@/components/user-info/social-media';
import { getProfile } from '@/services/fetch-public';
import { NotFoundPage } from '@/components/not-found-section';
import { ErrorPage } from '@/components/error-section';

export default async function Home() {
  try {
    const profile = await getProfile();

    if (!profile) {
      return (
        <NotFoundPage
          message={`Ruli-AlSe information not found`}
          suggestion="This is probably an error, please try again later"
        />
      );
    }

    return (
      <main className="w-full relative flex flex-col gap-8 items-start md:p-16 max-w-6xl px-3">
        <Presentation
          firstname={profile.name}
          lastName={profile.last_name}
          imageUrl={profile.image_url}
          headliner={profile.headliner}
          bio={profile.bio}
        />
        <SocialMediaInfo
          socialMedia={profile.social_media}
          className="w-full justify-center md:justify-end"
        />
        <SkillsSection competences={profile.competences} />
        <JobsSection jobs={profile.jobs} />
        <EducationTimeline educations={profile.education} />
      </main>
    );
  } catch (error: unknown) {
    console.error(JSON.stringify(error));

    return <ErrorPage message="Failed to load main page" />;
  }
}
