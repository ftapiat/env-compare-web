import { ReactNode } from 'react';

export const TableComponent = ({ children }: { children: ReactNode }) => {
  return (
    <table className="border-2 border-primary w-full text-center table-auto mb-5">
      {children}
    </table>
  );
};
