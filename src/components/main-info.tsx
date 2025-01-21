interface MainInfoProps {
  firstname: string;
  lastName: string;
  headliner: string;
  bio: string;
}

export const MainInfo = ({ firstname, lastName, headliner, bio }: MainInfoProps) => {
  return (
    <div className="w-full bg-orange-800 text-white p-8 rounded-lg">
      <h1 className="text-2xl font-bold">
        Hi there 👋! My name is {firstname} {lastName} I&apos;m {headliner}
      </h1>
      <h4 className="text-lg font-bold mt-6">A brief introduction about me...</h4>
      <p className="text-lg">{bio}</p>
    </div>
  );
};
