import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
    <html lang="en" className="font-roboto">
      <body className="bg-abyss text-white text-base md:text-lg container px-8 pt-10 mx-auto">
        {children}
      </body>
    </html>
  );
}
