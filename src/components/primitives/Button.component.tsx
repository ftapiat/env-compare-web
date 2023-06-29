import { ReactNode } from 'react';
import { SpinnerComponent } from '@/components/primitives';

interface ButtonComponentProps {
  className?: string;
  children: ReactNode;
  isLoading?: boolean;
}

export const ButtonComponent = ({
  className,
  children,
  isLoading = false,
}: ButtonComponentProps) => {
  return (
    <button
      className={`rounded p-2 rounded h-12 mb-7 bg-primary active:bg-primary font-bold text-abyss flex justify-center items-center disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <SpinnerComponent className="font-bold text-abyss" />
      ) : (
        children
      )}
    </button>
  );
};
