import Image from 'next/image';

interface Props {
  firstname: string;
  lastName: string;
  imageUrl?: string;
  headliner: string;
  bio: string;
}

export const Presentation = ({ firstname, lastName, imageUrl, headliner, bio }: Props) => {
  return (
    <section className="w-full text-dark-blue dark:text-white rounded-lg flex flex-col items-center gap-4 md:flex-row py-7 px-3">
      <Image
        src={imageUrl ?? ''}
        className="rounded-full w-[200px] h-[200px] border-2 border-light-blue dark:border-white"
        width={200}
        height={200}
        alt={`${firstname} photo`}
      />
      <div>
        <h1 className="text-xl md:text-2xl font-bold">
          Hi there 👋! My name is{' '}
          <span className="text-blue-500 dark:text-light-green font-mono">
            {firstname} {lastName}
          </span>{' '}
          I&apos;m <span className="text-blue-500 dark:text-light-green">{headliner}</span>
        </h1>
        <h4 className="md:text-lg font-bold my-6">A brief introduction about me...</h4>
        <p className="md:text-lg text-justify">{bio}</p>
      </div>
    </section>
  );
};
