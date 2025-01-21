import { Footer } from '@/components/footer';
import { MainInfo } from '@/components/main-info';
import { Navbar } from '@/components/navigation/navbar';
import { ProfessionalExperience } from '@/components/professional-experience';
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
    <>
      <Navbar />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <MainInfo
            firstname={profile.name}
            lastName={profile.last_name}
            headliner={profile.headliner}
            bio={profile.bio}
          />
          <SocialMediaInfo socialMedia={profile.social_media} className="w-6 h-6 text-green-700" />
          <ProfessionalExperience jobs={profile.jobs} />
          <code>{JSON.stringify(profile)}</code>
        </main>
        <Footer socialMedia={profile.social_media} />
      </div>
    </>
  );
}
