import { IconParagraphComponent } from './IconParagraph.component';
import { ReactNode } from 'react';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

export const IconParagraphDangerComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  const icon = {
    icon: faTimesCircle,
    className: 'text-danger',
  };

  return (
    <IconParagraphComponent icon={icon}>{children}</IconParagraphComponent>
  );
};
