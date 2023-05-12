import styles from './styles.module.css';

interface ResultsKeyDiffRowProps {
  keyDifferences1: string[];
  keyDifferences2: string[];
}

const generateKeyDifferencesCellJsx = (keyDifferences: string[]) => {
  return (
    <td className={styles.keyDifferencesCell}>
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
    <tr className="align-top">
      <td className="text-secondary">Keys</td>
      {generateKeyDifferencesCellJsx(keyDifferences1)}
      {generateKeyDifferencesCellJsx(keyDifferences2)}
    </tr>
  );
};
