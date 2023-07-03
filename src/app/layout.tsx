import './globals.css';
import React from 'react';
import { roboto } from '@/resources/fonts';
import { config } from '@fortawesome/fontawesome-svg-core';
import { CustomProvider } from '@/redux/provider';

export const metadata = {
  title: 'Env Files Comparer',
  description:
    'Utility to compare env files in various formats: Dotenv, Openshift configmaps (data), Openshift yaml env.',
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
  config.autoAddCss = false;

  return (
    <html lang="en" className={`${roboto.variable} font-roboto`}>
      <body className="bg-abyss text-white text-base md:text-lg px-8 md:px-16 2xl:px-32 pt-10 mx-auto">
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  );
}
