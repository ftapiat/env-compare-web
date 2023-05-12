import { ReactNode } from 'react';

interface TbodyProps {
  children: ReactNode;
  className?: string;
}

export const TbodyComponent = ({ children, className }: TbodyProps) => {
  return <tbody className={className}>{children}</tbody>;
};
