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
    <div className={`min-w-full flex flex-row h-96 min-h-[50vh] ${className}`}>
      {/* Todo add filename inputs */}
      <FileValueTextAreaComponent
        name="file_1_content"
        placeholder={`Paste the "File 1" content`}
        className="mr-2"
      />
      <FileValueTextAreaComponent
        name="file_2_content"
        placeholder={`Paste the "File 2" content`}
        className="ml-2"
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
      className={`flex-grow resize-none text-sm ${className}`}
      placeholder={placeholder}
    />
  );
}
