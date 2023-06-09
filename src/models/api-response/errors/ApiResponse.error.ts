import { ApiResponseStatusModel } from '@/models/api-response';

/**
 * Class Representing a controlled error response of an API call
 */
export class ApiResponseError extends Error {
  public name: string;
  public readonly status = ApiResponseStatusModel.error;
  public readonly service: string;

  /**
   * ApiResponseError constructor
   * @param {string} message
   * @param {string} service
   */
  constructor(message: string, service: string) {
    // Todo reduce boilerplate
    super(message);
    this.name = 'ApiResponseError';
    this.service = service;
  }
}
