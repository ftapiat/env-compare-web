'use client';

import 'reflect-metadata'; // Todo move to a root file
import { FormEvent, useState } from 'react';
import { FileDifferencesModel } from '@/models/file-differences';
import { plainToInstance } from 'class-transformer';
import FormInputsComponents from '@/components/form/FormInputs.components';
import { PageTitleComponent, ButtonComponent } from '@/components/primitives';
import { ResultsContentComponent } from '@/components/results';

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
        {diffResult && <ResultsContentComponent diffResult={diffResult} />}
      </form>
    </div>
  );
}
