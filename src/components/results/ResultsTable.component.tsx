import { FileDifferencesValuesModel } from '@/models/file-differences';
import { ComparedValuesModel } from '@/models/compared-values';
import {
  TableComponent,
  TbodyComponent,
  TheadComponent,
} from '@/components/primitives';
import { ValueDifferencesModel } from '@/models/value-differences';
import { ResultsKeyDiffRowComponent } from './ResultsKeyDiffRow.component';
import { ResultsValueDiffRowComponent } from '@/components/results/ResultsValueDiffRow.component';
import { robotoMono } from '@/resources/fonts';

interface ResultsTableInterface {
  values: FileDifferencesValuesModel;
  differences: ComparedValuesModel;
}

export const ResultsTableComponent = ({
  values,
  differences,
}: ResultsTableInterface) => {
  return (
    <TableComponent className="table-fixed">
      <TheadComponent>
        <tr>
          <th>Differences</th>
          <th className="text-secondary">{values.file1.fileName}</th>
          <th className="text-secondary">{values.file2.fileName}</th>
        </tr>
      </TheadComponent>
      <TbodyComponent className={`${robotoMono.variable} font-roboto-mono`}>
        <ResultsKeyDiffRowComponent
          keyDifferences1={differences.keyDifferences.file1}
          keyDifferences2={differences.keyDifferences.file2}
        />
        {differences.valueDifferences.length > 0 ? (
          differences.valueDifferences.map(
            (valueDifferences: ValueDifferencesModel, i: number) => (
              <ResultsValueDiffRowComponent
                key={i}
                differences={valueDifferences}
              />
            )
          )
        ) : (
          <tr>
            <td>Values</td>
            <td colSpan={2} className="text-zinc-600">
              {/* Todo extract classNames */}
              No diff: Simile KEYS have the same VALUES
            </td>
          </tr>
        )}
      </TbodyComponent>
    </TableComponent>
  );
};
