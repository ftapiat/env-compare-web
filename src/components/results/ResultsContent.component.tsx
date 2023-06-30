import { PageTitleComponent } from '@/components/primitives';
import { FileDifferencesInterface } from '@/models/file-differences';
import { ResultsTableComponent } from '@/components/results/ResultsTable.component';

export const ResultsContentComponent = ({
  diffResult,
}: {
  diffResult: FileDifferencesInterface;
}) => {
  return (
    <output name="result">
      <PageTitleComponent id="result">Result</PageTitleComponent>
      <ResultsTableComponent
        values={diffResult.values}
        differences={diffResult.differences}
      />
    </output>
  );
};
