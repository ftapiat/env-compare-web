import { ClassConstructor, plainToInstance } from 'class-transformer';

// Todo Add the rest of the properties here. Delete next line
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ApiResponseSimilarStructure {}

interface JsonStructure extends ApiResponseSimilarStructure {
  data: never;
}

/**
 * Class Representing the response of an API call
 * @template T
 */
export class ApiResponseModel<T> implements ApiResponseSimilarStructure {
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
    json: JsonStructure,
    fromJsonData: (dataJson: never) => T
  ): ApiResponseModel<T> {
    return new ApiResponseModel<T>(fromJsonData(json.data));
  }

  /**
   * Create an ApiResponseModel from a json object. The data part of the
   * json object will be converted to the classType.
   * @param {Object} json Json object to convert.
   * @param {ClassConstructor} classType Class to convert the data part of the json object.
   * @return {ApiResponseModel<T>}
   */
  static fromJsonWithClass<T>(
    json: JsonStructure,
    classType: ClassConstructor<T>
  ): ApiResponseModel<T> {
    const data = plainToInstance(classType, json.data);
    return new ApiResponseModel<T>(data as T);
  }
}
