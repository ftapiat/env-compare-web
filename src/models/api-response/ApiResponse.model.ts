import { ClassConstructor, plainToInstance } from 'class-transformer';

interface ApiResponseSimilarStructure {
  service: string;
  message: string;
}

interface JsonStructure extends ApiResponseSimilarStructure {
  data: never;
  status: string; // Todo Change to ENUM
}

/**
 * Class Representing the response of an API call
 * @template T
 */
export class ApiResponseModel<T> implements ApiResponseSimilarStructure {
  public readonly data: T;
  public readonly service: string;
  public readonly status: string; // Todo Change to ENUM
  public readonly message: string;

  /**
   * ApiResponseModel constructor
   * @template T
   * @param {T} data
   * @param {string} service
   * @param {string} status // Todo Change to ENUM
   * @param {string} message
   */
  constructor(data: T, service: string, status: string, message: string) {
    this.data = data;
    this.service = service;
    this.status = status; // Todo Change to ENUM
    this.message = message;
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
    return new ApiResponseModel<T>(
      fromJsonData(json.data),
      json.service,
      json.status,
      json.message
    );
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
    return new ApiResponseModel<T>(
      data as T,
      json.service,
      json.status,
      json.message
    );
  }
}
