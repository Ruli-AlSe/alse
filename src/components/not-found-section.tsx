'use client';

import { TbError404 } from 'react-icons/tb';

interface ErrorPageProps {
  message?: string;
  suggestion?: string;
}

export function NotFoundPage({
  message = 'Page you are looking for not found!',
  suggestion = 'Please try again later',
}: ErrorPageProps) {
  return (
    <div className="w-full min-h-[80vh] px-3 md:p-6 my-10 max-w-6xl flex flex-col items-center justify-center">
      <TbError404 className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="font-montserrat text-2xl md:text-5xl font-bold !leading-[1.5] text-center text-blue-500 dark:text-light-green mb-4">
        Oops!
      </h1>
      <p className="font-firaCode text-lg text-center text-light-blue dark:text-light-gold">
        {message}
      </p>
      <p className="font-firaCode text-sm text-center text-light-blue dark:text-light-gold mt-2">
        {suggestion}
      </p>
    </div>
  );
}
