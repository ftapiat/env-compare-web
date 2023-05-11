import {
  ValueDifferencesContentModel,
  ValueDifferencesModel,
} from '@/models/value-differences';

const getValueDifferencesJsx = (
  fileValueDifferences: ValueDifferencesContentModel
) => {
  const indexes = fileValueDifferences.indexDifferences;
  const content = fileValueDifferences.string;

  const arrayContent: JSX.Element[] = content
    .split('')
    .map((char: string, i: number) => {
      const className = indexes.includes(i) ? 'text-danger' : '';
      // Todo fix performance, reduce the number of spans
      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });

  return <>{arrayContent}</>;
};

export const ResultsValueDiffRowComponent = ({
  differences,
}: {
  differences: ValueDifferencesModel;
}) => {
  return (
    <tr>
      <td>{differences.key}</td>
      <td>{getValueDifferencesJsx(differences.file1)}</td>
      <td>{getValueDifferencesJsx(differences.file2)}</td>
    </tr>
  );
};
