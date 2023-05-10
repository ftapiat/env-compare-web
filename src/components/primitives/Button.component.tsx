import { ReactNode } from 'react';
import { SpinnerComponent } from '@/components/primitives';

interface ButtonComponenteProps {
  className?: string;
  children: ReactNode;
  isLoading?: boolean;
}

export const ButtonComponent = ({
  className,
  children,
  isLoading = false,
}: ButtonComponenteProps) => {
  return (
    <button
      className={`rounded p-2 rounded h-12 mb-7 bg-primary active:bg-primary font-bold text-abyss flex justify-center items-center ${className}`}
    >
      {isLoading ? (
        <SpinnerComponent className="font-bold text-abyss" />
      ) : (
        children
      )}
    </button>
  );
};
