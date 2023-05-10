/**
 * Component of the content of the comparison form.
 * @param {?string} className Classname of the div.
 * @constructor
 */
export default function FormInputs({ className }: { className?: string }) {
  return (
    <div className={`min-w-full flex flex-row h-96 min-h-[50vh] ${className}`}>
      {/* Todo add filename inputs */}
      <FileValueTextArea
        name="file_1_content"
        placeholder="File 1 content"
        className="mr-2"
      />
      <FileValueTextArea
        name="file_2_content"
        placeholder="File 2 content"
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
function FileValueTextArea({
  name,
  placeholder,
  className,
}: {
  name: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <textarea
      id={name}
      name={name}
      className={`flex-grow px-2 py-1 bg-neutral-700 text-important ${className}`}
      placeholder={placeholder}
      style={{ resize: 'none' }}
    />
  );
}
