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
      {keyDifferences1.length > 0 || keyDifferences2.length > 0 ? (
        <>
          {generateKeyDifferencesCellJsx(keyDifferences1)}
          {generateKeyDifferencesCellJsx(keyDifferences2)}
        </>
      ) : (
        <td colSpan={2} className="text-zinc-600">
          {/* Todo extract classNames */}
          No diff: Both files have the same KEYS
        </td>
      )}
    </tr>
  );
};
