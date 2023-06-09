import { ApiResponseError } from './ApiResponse.error';

/**
 * Class Representing a controlled error response of an API call with
 * validation messages
 */
export class ApiResponseValidationError extends ApiResponseError {
  public readonly data: string[];

  /**
   * ApiResponseValidationError constructor
   * @param {string} message
   * @param {string} service
   * @param {string[]} data
   */
  constructor(message: string, service: string, data: string[]) {
    super(message, service);
    this.name = 'ApiResponseValidationError';
    this.data = data;
  }

  /**
   * Creates an ApiResponseValidationError from a ApiResponseJsonStructure
   * @param {string} message
   * @param {string} service
   * @param {object} data
   * @return {ApiResponseValidationError}
   */
  static generateFromObject(
    message: string,
    service: string,
    data: object
  ): ApiResponseValidationError {
    const errorMessages =
      ApiResponseValidationError.generateDataFromObject(data);
    return new ApiResponseValidationError(message, service, errorMessages);
  }

  /**
   * Generates an array of strings from a validation messages object
   * @param {object} data
   * @return {string[]}
   */
  static generateDataFromObject(data: object): string[] {
    return (
      Object.entries(data)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(([_, value]) => {
          if (typeof value === 'string') {
            return value;
          }

          return ApiResponseValidationError.generateDataFromObject(value);
        })
        .flat()
    );
  }
}
