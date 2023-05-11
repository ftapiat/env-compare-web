import {
  ValueDifferencesContentModel,
  ValueDifferencesModel,
} from '@/models/value-differences';

const generateValueWithDifferencesJsx = (
  fileValueDifferences: ValueDifferencesContentModel
) => {
  const arrayContent: JSX.Element[] = [];

  let latestWord = '';
  let isLastCharPainted = false;

  const addWord = (word: string, painted: boolean) => {
    arrayContent.push(
      <span
        key={arrayContent.length + 1}
        className={painted ? 'text-danger' : ''}
      >
        {word}
      </span>
    );
  };

  const iterableValues = fileValueDifferences.string.split('');
  iterableValues.forEach((char: string, i: number) => {
    if (
      fileValueDifferences.indexDifferences.includes(i) !== isLastCharPainted
    ) {
      // Change of color. Add the buffered word.
      addWord(latestWord, isLastCharPainted);
      // Reset the buffer
      isLastCharPainted = !isLastCharPainted;
      latestWord = '';
    }

    // Keeps adding the chars to the buffer until it finds or end a differed word.
    latestWord += char;

    if (i === iterableValues.length - 1) {
      // Last char. Add the buffered word.
      addWord(latestWord, isLastCharPainted);
    }
  });

  return arrayContent;
};

export const ResultsValueDiffRowComponent = ({
  differences,
}: {
  differences: ValueDifferencesModel;
}) => {
  return (
    <tr>
      <td>{differences.key}</td>
      <td className="">{generateValueWithDifferencesJsx(differences.file1)}</td>
      <td className="">{generateValueWithDifferencesJsx(differences.file2)}</td>
    </tr>
  );
};
