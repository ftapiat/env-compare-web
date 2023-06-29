import 'reflect-metadata'; // Todo move to a root file
import { NextResponse } from 'next/server';
import { FileRepository, FileValueRepository } from '@/models/repositories';
import {
  FileDifferencesModel,
  FileDifferencesValuesModel,
} from '@/models/file-differences';
import { instanceToPlain } from 'class-transformer';
import {
  ApiResponseModel,
  ApiResponseStatusModel,
  ApiResponseError,
  ApiResponseValidationError,
} from '@/models/api-response';

/**
 * Returns a "Hello World" response from the API.
 * @param {Request} request
 * @constructor
 */
export async function POST(request: Request) {
  const body = await request.json();
  const [comparableFile1, comparableFile2] = body.files;

  // Get both values on parallel
  const repository = new FileRepository();
  const [responseValues1, responseValues2] = await Promise.allSettled([
    repository.getValues(comparableFile1),
    repository.getValues(comparableFile2),
  ]);

  const service = 'compare-files';

  if (
    responseValues1.status === 'fulfilled' &&
    responseValues2.status === 'fulfilled'
  ) {
    // Ok response
    const responseDifferences = await new FileValueRepository().getDifferences([
      responseValues1.value.data,
      responseValues2.value.data,
    ]);

    const values = new FileDifferencesModel(
      new FileDifferencesValuesModel(
        responseValues1.value.data,
        responseValues2.value.data
      ),
      responseDifferences.data
    );

    const apiResponse = new ApiResponseModel<FileDifferencesModel>(
      values,
      service,
      ApiResponseStatusModel.ok,
      'Files compared successfully'
    );
    return NextResponse.json(apiResponse.toJsonClassTransformer(), {
      status: 200,
    });
  }

  const generateErrorMessages = (
    fileName: string,
    errorReason: unknown
  ): string[] => {
    if (errorReason instanceof ApiResponseValidationError) {
      return errorReason.data.map((error) => `${fileName}: ${error}`);
    } else if (errorReason instanceof ApiResponseError) {
      return [`${fileName}: ${errorReason.message}`];
    }
    return [`${fileName}: Error getting values for file`];
  };

  // Error response
  const errors: string[] = [];
  if (responseValues1.status === 'rejected') {
    errors.push(
      ...generateErrorMessages(comparableFile1.name, responseValues1.reason)
    );
  }

  if (responseValues2.status === 'rejected') {
    errors.push(
      ...generateErrorMessages(comparableFile2.name, responseValues2.reason)
    );
  }

  const data = new ApiResponseValidationError('', service, errors);
  return NextResponse.json(instanceToPlain(data), { status: 400 });
}
