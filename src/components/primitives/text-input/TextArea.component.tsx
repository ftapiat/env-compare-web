import styles from './styles.module.css';
import { robotoMono } from '@/resources/fonts';
import { ValidationState } from '@/components/primitives/shared/props';

interface TextAreaProps {
  id: string;
  name: string;
  className?: string;
  placeholder: string;
  validationState?: ValidationState;
  required?: boolean;
}

export const TextAreaComponent = ({
  id,
  name,
  className,
  placeholder,
  required = false,
}: TextAreaProps) => {
  return (
    <textarea
      id={id}
      name={name}
      className={`px-2 py-1 ${robotoMono.variable} ${styles.inputColors} ${className}`}
      placeholder={placeholder}
      required={required}
    />
  );
};
