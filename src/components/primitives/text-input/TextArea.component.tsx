import styles from './styles.module.css';
import { robotoMono } from '@/resources/fonts';
import {
  getColorClassFromValidation,
  ValidationState,
} from '@/components/primitives/shared/props';

interface TextAreaProps {
  id: string;
  name: string;
  className?: string;
  placeholder: string;
  validationState?: ValidationState;
}

const getScrollColorClass = (validation: ValidationState): string => {
  const baseClass = 'scrollbar-thumb';
  const color = getColorClassFromValidation(validation);
  return color ? `${baseClass}-${color}` : '';
};

export const TextAreaComponent = ({
  id,
  name,
  className,
  placeholder,
  validationState = ValidationState.NONE,
}: TextAreaProps) => {
  const scrollColorClass = getScrollColorClass(validationState);
  return (
    <textarea
      id={id}
      name={name}
      className={`px-2 py-1 ${robotoMono.variable} ${styles.inputColors} ${styles.textAreaScrollbar} ${scrollColorClass} ${className}`}
      placeholder={placeholder}
    />
  );
};
