'use client';

import { FormEvent } from 'react';
import FormInputsComponents from '@/components/form/FormInputs.components';
import { PageTitleComponent, ButtonComponent } from '@/components/primitives';
import { ResultsContentComponent } from '@/components/results';
import { ErrorsListComponent } from '@/components/errors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchFileDifferences,
  selectFilteredFileDifferences,
} from '@/redux/features/fileDifferencesSlice';

type FormTarget = EventTarget & {
  file_1_content: { value: string };
  file_2_content: { value: string };
};

/**
 * Home page
 * @constructor
 */
export default function Home() {
  const dispatch = useAppDispatch();
  const diffResult = useAppSelector((state) =>
    selectFilteredFileDifferences(state.fileDifferencesReducer)
  );
  const errorMessages = useAppSelector(
    (state) => state.fileDifferencesReducer.errors
  );
  const isLoadingResult = useAppSelector(
    (state) => state.fileDifferencesReducer.loading
  );

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const target = event.target as FormTarget;

    await dispatch(
      fetchFileDifferences({
        fileContent1: target.file_1_content.value,
        fileContent2: target.file_2_content.value,
      })
    );
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
