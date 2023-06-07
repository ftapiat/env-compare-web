import { TextAreaComponent, InputComponent } from '@/components/primitives';

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
  const FILES_COUNT = 2;

  return (
    <div
      className={`min-w-full h-[75vh] grid gap-3 grid-cols-1 lg:grid-cols-2 pb-3 ${className}`}
    >
      {Array(FILES_COUNT)
        .fill(null)
        .map((_, i) => {
          const defaultFileName = `File ${i}`;
          const fileName = defaultFileName; // Todo add from state

          return (
            <div key={i}>
              <InputComponent
                labelText={`File ${i} name`}
                name={`file_${i}_name`}
                placeholder={defaultFileName}
              />
              <FileValueTextAreaComponent
                name={`file_${i}_content`}
                placeholder={`Paste the "${fileName}" content`}
              />
            </div>
          );
        })}
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
      className={`resize-none text-sm w-full h-full ${className ?? ''}`}
      placeholder={placeholder}
    />
  );
}
