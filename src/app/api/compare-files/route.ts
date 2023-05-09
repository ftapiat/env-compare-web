import 'reflect-metadata'; // Todo move to a root file
import { NextResponse } from 'next/server';
import { FileRepository, FileValueRepository } from '@/models/repositories';
import {
  FileDifferencesModel,
  FileDifferencesValuesModel,
} from '@/models/file-differences';
import { instanceToPlain } from 'class-transformer';

/**
 * Returns a "Hello World" response from the API.
 * @param {Request} request
 * @constructor
 */
export async function POST(request: Request) {
  // Todo add validation
  const body = await request.json();
  const [comparableFile1, comparableFile2] = body.files;

  // Todo handle errors
  // Get both values on parallel
  const repository = new FileRepository();
  const [responseValues1, responseValues2] = await Promise.all([
    repository.getValues(comparableFile1),
    repository.getValues(comparableFile2),
  ]);

  const responseDifferences = await new FileValueRepository().getDifferences([
    responseValues1.data,
    responseValues2.data,
  ]);

  const values = new FileDifferencesModel(
    new FileDifferencesValuesModel(responseValues1.data, responseValues2.data),
    responseDifferences.data
  );

  return NextResponse.json(instanceToPlain(values));
}
