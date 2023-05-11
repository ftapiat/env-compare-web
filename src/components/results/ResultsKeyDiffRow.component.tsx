interface ResultsKeyDiffRowProps {
  keyDifferences1: string[];
  keyDifferences2: string[];
}

const generateKeyDifferencesJsx = (keyDifferences: string[]) => {
  return (
    <td>
      {keyDifferences.map((keyName: string, i: number) => (
        <p key={i}>{keyName}</p>
      ))}
    </td>
  );
};

export const ResultsKeyDiffRowComponent = ({
  keyDifferences1,
  keyDifferences2,
}: ResultsKeyDiffRowProps) => {
  return (
    <tr>
      <td className="text-secondary">Keys</td>
      {generateKeyDifferencesJsx(keyDifferences1)}
      {generateKeyDifferencesJsx(keyDifferences2)}
    </tr>
  );
};
