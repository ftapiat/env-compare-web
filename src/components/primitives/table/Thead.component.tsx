import { ReactNode } from 'react';

export const TheadComponent = ({ children }: { children: ReactNode }) => {
  return (
    <thead className="border-b-2 border-b-primary bg-zinc-800">
      {children}
    </thead>
  );
};
