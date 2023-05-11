import { PageTitleComponent } from '@/components/primitives';
import { FileDifferencesModel } from '@/models/file-differences';
import { ResultsTableComponent } from '@/components/results/ResultsTable.component';

export const ResultsContentComponent = ({
  diffResult,
}: {
  diffResult: FileDifferencesModel;
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
