import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
  icon: IconDefinition;
  className?: string;
}

export const IconParagraphComponent = ({
  icon,
  children,
}: {
  icon: IconProps;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-row">
      <div className="self-center">
        <FontAwesomeIcon icon={icon.icon} className={icon.className} />
      </div>
      <p className="ml-3 flex-grow">{children}</p>
    </div>
  );
};
