import { EducationTimeline } from '@/components/education/timeline';
import { Footer } from '@/components/footer';
import { MainInfo } from '@/components/main-info';
import { Navbar } from '@/components/navigation/navbar';
import { JobsSection } from '@/components/professional-experience/jobs-section';
import { SkillsSection } from '@/components/skills-showcase/skills-section';
import { SocialMediaInfo } from '@/components/social-media';
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 dark:from-dark-blue dark:from-30% to-teal-100 dark:to-light-blue">
      <Navbar />
      <main className="flex flex-col gap-8 items-start md:p-16 max-w-6xl">
        <MainInfo
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
    </div>
  );
}
