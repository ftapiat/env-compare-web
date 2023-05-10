'use client';

import 'reflect-metadata'; // Todo move to a root file
import { FormEvent, useState } from 'react';
import { FileDifferencesModel } from '@/models/file-differences';
import {
  ValueDifferencesContentModel,
  ValueDifferencesModel,
} from '@/models/value-differences';
import { plainToInstance } from 'class-transformer';
import FormInputsComponents from '@/components/form/FormInputs.components';
import { PageTitleComponent, ButtonComponent } from '@/components/primitives';

type FormTarget = EventTarget & {
  file_1_content: { value: string };
  file_2_content: { value: string };
};

/**
 * Home page
 * @constructor
 */
export default function Home() {
  const [isLoadingResult, setIsLoadingResult] = useState(false); // Todo extract to redux state
  const [diffResult, setDiffResult] = useState<FileDifferencesModel | null>(
    null
  ); // Todo type

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as FormTarget;
    setDiffResult(null);
    setIsLoadingResult(true);

    const data = {
      files: [
        {
          name: 'file 1',
          content: target.file_1_content.value,
        },
        {
          name: 'file 2',
          content: target.file_2_content.value,
        },
      ],
    };

    const JsonData = JSON.stringify(data);

    const endpoint = '/api/compare-files';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JsonData,
    };

    try {
      const response = await fetch(endpoint, options);
      const result = await response.json();
      setDiffResult(
        plainToInstance(
          FileDifferencesModel,
          result
        ) as unknown as FileDifferencesModel
      );
    } catch (e) {
      // TODO Handle errors
      console.error('Error found while parsing data', e);
    } finally {
      setIsLoadingResult(false);
    }
  };

  const getJsxValueDifferences = (
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

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <PageTitleComponent id="diff-form-title">
          Env files comparer
        </PageTitleComponent>
        <FormInputsComponents className="mb-7" />
        <ButtonComponent isLoading={isLoadingResult} className="w-1/4">
          Compare
        </ButtonComponent>
        {diffResult && (
          <>
            <p>Result:</p>
            <output name="result" htmlFor="file_1_content file_2_content">
              <table className="border-2 border-primary w-full text-center table-auto mb-5">
                <thead className="border-b-2 border-b-primary">
                  <tr>
                    <th>Difference</th>
                    <th className="text-secondary">
                      {diffResult.values.file1.fileName}
                    </th>
                    <th className="text-secondary">
                      {diffResult.values.file2.fileName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-secondary">Keys</td>
                    {/* Todo Simplify */}
                    <td>
                      {diffResult.differences.keyDifferences.file1.map(
                        (keyName: string, i: number) => (
                          <p key={i}>{keyName}</p>
                        )
                      )}
                    </td>
                    <td>
                      {diffResult.differences.keyDifferences.file2.map(
                        (keyName: string, i: number) => (
                          <p key={i}>{keyName}</p>
                        )
                      )}
                    </td>
                  </tr>
                  {diffResult.differences.valueDifferences.map(
                    (differences: ValueDifferencesModel, i: number) => (
                      <tr key={i}>
                        <td>{differences.key}</td>
                        <td>{getJsxValueDifferences(differences.file1)}</td>
                        <td>{getJsxValueDifferences(differences.file2)}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </output>
          </>
        )}
      </form>
    </div>
  );
}
