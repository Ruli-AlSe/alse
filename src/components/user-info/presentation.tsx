import Image from 'next/image';
import SplitText from '../animations/split-text';
import { BlurredLight } from '../blurred-light';
import FadeContent from '../animations/fade-content';

interface Props {
  firstname: string;
  lastName: string;
  imageUrl?: string;
  headliner: string;
  bio: string;
}

export const Presentation = ({ firstname, lastName, imageUrl, headliner, bio }: Props) => {
  return (
    <section className="w-full relative text-dark-blue dark:text-white rounded-lg flex flex-col items-center gap-4 md:flex-row py-7 px-3">
      <BlurredLight extraClasses="w-60 h-60 top-6 left-0 bg-blue-500 blur-[300px]" />
      <FadeContent direction="horizontal" className="w-[200px] h-[200px]" reverse>
        <Image
          src={imageUrl ?? ''}
          className="rounded-full w-[200px] h-[200px] border-2 border-light-blue dark:border-white"
          width={200}
          height={200}
          alt={`${firstname} photo`}
        />
      </FadeContent>
      <div>
        <h1 className="font-montserrat text-2xl md:text-5xl font-bold !leading-[1.5]">
          <SplitText text={'Hi there! My name is '} />
          <SplitText
            text={`${firstname} ${lastName} `}
            className="font-firaCode text-blue-500 dark:text-light-green"
          />
          <SplitText text="and I am a " />
          <SplitText
            text={headliner}
            className="font-firaCode text-blue-500 dark:text-light-green"
          />
        </h1>
        <FadeContent direction="vertical" className="w-full">
          <h4 className="font-poppins text-lg font-bold my-9">A brief introduction about me...</h4>
          <p className="--font-openSans md:text-lg text-justify">{bio}</p>
        </FadeContent>
      </div>
    </section>
  );
};
