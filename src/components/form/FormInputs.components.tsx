import { TextAreaComponent } from '@/components/primitives';

/**
 * Component of the content of the comparison form.
 * @param {?string} className Classname of the div.
 * @constructor
 */
export default function FormInputsComponents({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`min-w-full h-[75vh] grid gap-3 grid-cols-1 lg:grid-cols-2 ${className}`}
    >
      {/* Todo add filename inputs */}
      <FileValueTextAreaComponent
        name="file_1_content"
        placeholder={`Paste the "File 1" content`}
      />
      <FileValueTextAreaComponent
        name="file_2_content"
        placeholder={`Paste the "File 2" content`}
      />
    </div>
  );
}

/**
 * Component of the content of the comparison file to use in the form.
 * @param {string} name Name and id of the textarea
 * @param {string} placeholder Placeholder of the textarea
 * @param {?string} className Classname of the textarea
 * @constructor
 */
function FileValueTextAreaComponent({
  name,
  placeholder,
  className,
}: {
  name: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <TextAreaComponent
      id={name}
      name={name}
      className={`resize-none text-sm ${className}`}
      placeholder={placeholder}
    />
  );
}
