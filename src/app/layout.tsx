import './globals.css';
import React from 'react';
import { roboto } from '@/resources/fonts';

export const metadata = {
  title: 'Env files comparer',
  description:
    'Compare the content of two files and get the differences (dotenv, openshift configmap, openshift env yaml)',
};

/**
 * Root layout component
 * @param {React.ReactNode} children
 * @constructor
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} font-roboto`}>
      <body className="bg-abyss text-white text-base md:text-lg px-8 md:px-16 2xl:px-32 pt-10 mx-auto">
        {children}
      </body>
    </html>
  );
}
