import { ReactNode } from 'react';
import Link from 'next/link';

interface PageTitleProps {
  id?: string;
  children: ReactNode;
}

export const PageTitleComponent = ({ id, children }: PageTitleProps) => {
  return (
    <h1 id={id} className="text-xl font-bold mb-7">
      <Link href={`#${id}`} className="text-primary">
        #
      </Link>
      &nbsp;{children}
    </h1>
  );
};
