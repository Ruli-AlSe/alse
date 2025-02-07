'use client';

import { AlertTriangle } from 'lucide-react';

interface ErrorPageProps {
  message?: string;
}

export function ErrorPage({ message = 'Something went wrong!' }: ErrorPageProps) {
  return (
    <div className="w-full min-h-[50vh] px-3 md:p-6 my-10 max-w-6xl flex flex-col items-center justify-center">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="font-montserrat text-2xl md:text-5xl font-bold !leading-[1.5] text-center text-blue-500 dark:text-light-green mb-4">
        Oops!
      </h1>
      <p className="font-firaCode text-lg text-center text-light-blue dark:text-light-gold">
        {message}
      </p>
      <p className="font-firaCode text-sm text-center text-light-blue dark:text-light-gold mt-2">
        Please try again later
      </p>
    </div>
  );
}
