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
      <main className="relative flex flex-col gap-8 items-start md:p-16 max-w-6xl">
        {/* <div className="z-[35] pointer-events-none absolute inset-0 flex w-screen items-center justify-center overflow-hidden [mask-image:radial-gradient(transparent_15%,white)]">
          <svg
            className="absolute z-[35]  left-0 top-0 size-full stroke-black dark:stroke-white/20 stroke-[1] [mask-image:linear-gradient(transparent_15%,white,transparent_85%)]"
            data-n-ids='{"1a4MN34vH0:0":"1a4MN34vH0:0"}'
          >
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#grid-pattern-1a4MN34vH0:0)"
            ></rect>
            <svg>
              <rect
                strokeWidth="0"
                width="95"
                height="95"
                x="97"
                y="97"
                className="pointer-events-auto fill-black/5 hover:fill-black/10 dark:fill-white/20 dark:hover:fill-white/30  transition duration-500"
              ></rect>
              <rect
                strokeWidth="0"
                width="95"
                height="95"
                x="385"
                y="193"
                className="pointer-events-auto fill-black/5 hover:fill-black/10 dark:fill-white/20 dark:hover:fill-white/30  transition duration-500"
              ></rect>
              <rect
                strokeWidth="0"
                width="95"
                height="95"
                x="193"
                y="289"
                className="pointer-events-auto fill-black/5 hover:fill-black/10 dark:fill-white/20 dark:hover:fill-white/30  transition duration-500"
              ></rect>
              <rect
                strokeWidth="0"
                width="95"
                height="95"
                x="673"
                y="289"
                className="pointer-events-auto fill-black/5 hover:fill-black/10 dark:fill-white/20 dark:hover:fill-white/30  transition duration-500"
              ></rect>
              <rect
                strokeWidth="0"
                width="95"
                height="95"
                x="481"
                y="385"
                className="pointer-events-auto fill-black/5 hover:fill-black/10 dark:fill-white/20 dark:hover:fill-white/30  transition duration-500"
              ></rect>
              <rect
                strokeWidth="0"
                width="95"
                height="95"
                x="1249"
                y="97"
                className="pointer-events-auto fill-black/5  hover:fill-black/10 dark:fill-white/20 dark:hover:fill-white/30  transition duration-500"
              ></rect>
              <rect
                strokeWidth="0"
                width="95"
                height="95"
                x="1"
                y="481"
                className="pointer-events-auto fill-black/5  hover:fill-black/10 dark:fill-white/20 dark:hover:fill-white/30  transition duration-500"
              ></rect>
              <rect
                strokeWidth="0"
                width="95"
                height="95"
                x="577"
                y="481"
                className="pointer-events-auto fill-black/5 hover:fill-black/10 dark:fill-white/20 dark:hover:fill-white/30  transition duration-500"
              ></rect>
              <rect
                strokeWidth="0"
                width="95"
                height="95"
                x="1441"
                y="385"
                className="pointer-events-auto fill-black/5 hover:fill-black/10 dark:fill-white/20 dark:hover:fill-white/30  transition duration-500"
              ></rect>
              <rect
                strokeWidth="0"
                width="95"
                height="95"
                x="1057"
                y="289"
                className="pointer-events-auto fill-black/5 hover:fill-black/10 dark:fill-white/20 dark:hover:fill-white/30  transition duration-500"
              ></rect>
              <rect
                strokeWidth="0"
                width="95"
                height="95"
                x="961"
                y="481"
                className="pointer-events-auto fill-black/5 hover:fill-black/10 dark:fill-white/20 dark:hover:fill-white/30  transition duration-500"
              ></rect>
              <rect
                strokeWidth="0"
                width="95"
                height="95"
                x="1249"
                y="577"
                className="pointer-events-auto fill-muted/5 transition duration-500 hover:fill-white/10  "
              ></rect>
            </svg>
            <defs>
              <pattern
                id="grid-pattern-1a4MN34vH0:0"
                viewBox="0 0 64 64"
                width="96"
                height="96"
                patternUnits="userSpaceOnUse"
              >
                <path d="M64 0H0V64" fill="none"></path>
              </pattern>
            </defs>
          </svg>
        </div> */}
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
