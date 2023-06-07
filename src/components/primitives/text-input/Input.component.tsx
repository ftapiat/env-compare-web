import styles from './styles.module.css';
import { robotoMono } from '@/resources/fonts';
import { ValidationState } from '@/components/primitives/shared/props';

interface InputProps {
  labelText: string;
  name: string;
  className?: string;
  placeholder: string;
  autocomplete?: boolean;
  validationState?: ValidationState;
}

export const InputComponent = ({
  labelText,
  name,
  className,
  placeholder,
  autocomplete = false,
}: InputProps) => {
  return (
    <div className={className ?? ''}>
      <label className="block text-sm" htmlFor={name}>
        {labelText}
      </label>
      <input
        id={name}
        name={name}
        className={`block px-2 py-1 ${robotoMono.variable} ${styles.inputColors} ${className}`}
        placeholder={placeholder}
        autoComplete={autocomplete ? 'on' : 'off'}
      />
    </div>
  );
};
