import { ApiResponseValidationError } from '@/models/api-response';
import { ApiResponseJsonStructure } from '../ApiResponseDataStructure';
import { ApiResponseError } from './ApiResponse.error';

const apiResponseErrorMessages = {
  validationError: 'Validation error, please validate your request',
};

/**
 * Factory to create an ApiResponseError from a ApiResponseJsonStructure
 */
export class ApiResponseErrorFactory {
  /**
   * Creates an ApiResponseError from a ApiResponseJsonStructure
   * @param {string} message
   * @param {string} service
   * @param {*} data
   * @return {ApiResponseError}
   */
  public static create({
    message,
    service,
    data,
  }: ApiResponseJsonStructure): ApiResponseError {
    // Todo reduce boilerplate
    if (message === apiResponseErrorMessages.validationError) {
      return ApiResponseValidationError.generateFromObject(
        message,
        service,
        data as object
      );
    }

    return new ApiResponseError(message, service);
  }
}
