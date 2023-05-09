/**
 * Class Representing the response of an API call
 * @template T
 */
export class ApiResponseModel<T> {
  public data: T;

  /**
   * ApiResponseModel constructor
   * @template T
   * @param {T} data
   */
  constructor(data: T) {
    this.data = data;
  }

  /**
   * Create an ApiResponseModel from a json object.
   * @param {Object} json Json object to convert.
   * @param {Function} fromJsonData Function to convert the
   * data part of the json object.
   * @return {ApiResponseModel<T>}
   */
  static fromJson<T>(
    json: { [key: string]: never },
    fromJsonData: (dataJson: never) => T
  ): ApiResponseModel<T> {
    return new ApiResponseModel<T>(fromJsonData(json.data));
  }
}
