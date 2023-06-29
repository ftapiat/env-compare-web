import { ErrorItemComponent } from '@/components/errors/ErrorItem.component';
import { IconParagraphDangerComponent } from '@/components/shared/icon-paragraph';
import { useEffect } from 'react';

export const ErrorsListComponent = ({ errors }: { errors: string[] }) => {
  // Focus on the errors list when it is rendered
  useEffect(() => document.getElementById('errors')?.scrollIntoView(), []);

  return (
    <div id="errors" tabIndex={0}>
      <h2>
        <IconParagraphDangerComponent>
          Errors found:
        </IconParagraphDangerComponent>
      </h2>
      <ul className="list-disc list-inside px-1.5 text-danger">
        {errors.map((error, index) => (
          <ErrorItemComponent key={index} error={error} />
        ))}
      </ul>
    </div>
  );
};
