import { ReactNode } from 'react';
import styles from './styles.module.css';

interface TableProps {
  className?: string;
  children: ReactNode;
}

export const TableComponent = ({ className, children }: TableProps) => {
  return (
    <table className={`w-full text-center mb-5 ${styles.table} ${className}`}>
      {children}
    </table>
  );
};
