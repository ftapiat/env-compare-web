import { ReactNode } from 'react';

export const TheadComponent = ({ children }: { children: ReactNode }) => {
  return <thead className="bg-abyss-accent">{children}</thead>;
};
