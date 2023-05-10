import styles from './styles.module.css';
import { robotoMono } from '@/resources/fonts';

interface TextAreaProps {
  id: string;
  name: string;
  className?: string;
  placeholder: string;
}

export const TextAreaComponent = ({
  id,
  name,
  className,
  placeholder,
}: TextAreaProps) => {
  return (
    <textarea
      id={id}
      name={name}
      className={`px-2 py-1 mr-2  ${robotoMono.variable} ${styles.inputColors} ${className}`}
      placeholder={placeholder}
    />
  );
};
