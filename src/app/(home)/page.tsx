import { EducationTimeline } from '@/components/education/timeline';
import { Footer } from '@/components/footer';
import { Presentation } from '@/components/user-info/presentation';
import { JobsSection } from '@/components/professional-experience/jobs-section';
import { SkillsSection } from '@/components/skills-showcase/skills-section';
import { SocialMediaInfo } from '@/components/user-info/social-media';
import { Profile } from '@/interfaces/profile';

const getProfile = async (): Promise<Profile> => {
  const api = process.env.API_URL;
  const userEmail = process.env.USER_EMAIL;
  const data: Profile = await fetch(`${api}/profiles/${userEmail}`).then((res) => res.json());

  return data;
};

export default async function Home() {
  const profile = await getProfile();

  return (
    <>
      <main className="flex flex-col gap-8 items-start md:p-16 max-w-6xl">
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
        <JobsSection jobs={profile.jobs} />
        <SkillsSection competences={profile.competences} />
        <EducationTimeline educations={profile.education} />
      </main>
      <Footer socialMedia={profile.social_media} />
    </>
  );
}
