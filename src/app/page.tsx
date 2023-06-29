'use client';

import 'reflect-metadata'; // Todo move to a root file
import { FormEvent, useState } from 'react';
import { FileDifferencesModel } from '@/models/file-differences';
import FormInputsComponents from '@/components/form/FormInputs.components';
import { PageTitleComponent, ButtonComponent } from '@/components/primitives';
import { ResultsContentComponent } from '@/components/results';
import { ComparedValuesModel } from '@/models/compared-values';
import {
  ApiResponseModel,
  ApiResponseValidationError,
} from '@/models/api-response';
import { plainToInstance } from 'class-transformer';
import { ErrorsListComponent } from '@/components/errors';

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
  const [errorMessages, setErrorMessages] = useState<string[] | null>(null);
  const [diffResult, setDiffResult] = useState<FileDifferencesModel | null>(
    null
  );

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const target = event.target as FormTarget;
    setDiffResult(null);
    setIsLoadingResult(true);
    setErrorMessages(null);

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
      const plainResponse = await response.json();
      if (response.status === 200) {
        const apiResponse =
          ApiResponseModel.fromJsonWithClass<FileDifferencesModel>(
            plainResponse,
            FileDifferencesModel
          );

        const fileDifferences = apiResponse.data;

        // Filter the results to only show the KEYS with differences
        const filteredFileDifferences = new FileDifferencesModel(
          fileDifferences.values,
          new ComparedValuesModel(
            fileDifferences.differences.keyDifferences,
            fileDifferences.differences.valueDifferences.filter(
              (valueDifferences) => {
                return (
                  valueDifferences.file1.indexDifferences.length > 0 ||
                  valueDifferences.file2.indexDifferences.length > 0
                );
              }
            )
          )
        );

        setDiffResult(filteredFileDifferences);
      } else {
        const error = plainToInstance(
          ApiResponseValidationError,
          plainResponse
        ) as unknown as ApiResponseValidationError;
        setErrorMessages(error.data);
      }
    } catch (e) {
      // TODO Handle errors
      console.error('Error found while parsing data', e);
    } finally {
      setIsLoadingResult(false);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <PageTitleComponent id="diff-form">
          Env files comparer
        </PageTitleComponent>
        <FormInputsComponents className="mb-7" />
        <ButtonComponent isLoading={isLoadingResult} className="w-1/3 md:w-1/4">
          Compare
        </ButtonComponent>
        {errorMessages && <ErrorsListComponent errors={errorMessages} />}
        {diffResult && <ResultsContentComponent diffResult={diffResult} />}
      </form>
    </div>
  );
}
