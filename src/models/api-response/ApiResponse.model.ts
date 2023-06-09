import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { ApiResponseStatusModel } from './ApiResponseStatus.model';
import { ApiResponseErrorFactory } from '@/models/api-response/errors';
import {
  ApiResponseSimilarStructure,
  ApiResponseJsonStructure,
} from './ApiResponseDataStructure';

/**
 * Class Representing the response of an API call
 * @template T
 */
export class ApiResponseModel<T> implements ApiResponseSimilarStructure {
  public readonly data: T;
  public readonly service: string;
  public readonly status: ApiResponseStatusModel;
  public readonly message: string;

  /**
   * ApiResponseModel constructor
   * @template T
   * @param {T} data
   * @param {string} service
   * @param {ApiResponseStatusModel} status
   * @param {string} message
   */
  constructor(
    data: T,
    service: string,
    status: ApiResponseStatusModel,
    message: string
  ) {
    this.data = data;
    this.service = service;
    this.status = status;
    this.message = message;
  }

  /**
   * Create an ApiResponseModel from a json object. The data part of the
   * json object will be converted to the classType.
   * @param {Object} json Json object to convert.
   * @param {ClassConstructor} classType Class to convert the data part of the json object.
   * @return {ApiResponseModel<T>}
   */
  static fromJsonWithClass<T>(
    json: ApiResponseJsonStructure,
    classType: ClassConstructor<T>
  ): ApiResponseModel<T> {
    return ApiResponseModel.fromJson(json, (data) =>
      plainToInstance(classType, data)
    );
  }

  /**
   * Create an ApiResponseModel from a json object.
   * @param {Object} json Json object to convert.
   * @param {Function} fromJsonData Function to convert the
   * data part of the json object.
   * @return {ApiResponseModel<T>}
   */
  static fromJson<T>(
    json: ApiResponseJsonStructure,
    fromJsonData: (dataJson: unknown) => T
  ): ApiResponseModel<T> {
    const status =
      ApiResponseStatusModel[
        json.status as keyof typeof ApiResponseStatusModel
      ];

    if (status === ApiResponseStatusModel.error) {
      throw ApiResponseErrorFactory.create(json);
    }

    return new ApiResponseModel<T>(
      fromJsonData(json.data),
      json.service,
      status,
      json.message
    );
  }

  /**
   * Convert the ApiResponseModel to a json object.
   * @param {Function} dataToJson Converter function for the data part of the json object.
   * @return {ApiResponseJsonStructure}
   */
  public toJson(dataToJson: (data: T) => unknown): ApiResponseJsonStructure {
    return {
      data: dataToJson(this.data),
      service: this.service,
      status: ApiResponseStatusModel[this.status],
      message: this.message,
    };
  }

  /**
   * Convert the ApiResponseModel to a json object. The data part
   * will be converted to a plain object automatically.
   * @return {ApiResponseJsonStructure}
   */
  public toJsonClassTransformer(): ApiResponseJsonStructure {
    return this.toJson((data) => instanceToPlain(data));
  }
}
