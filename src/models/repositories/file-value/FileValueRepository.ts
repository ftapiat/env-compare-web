import { FileValuesModel } from '@/models/file-values';
import { ApiResponseModel } from '@/models/api-response';
import { ComparedValuesModel } from '@/models/compared-values';
import { HttpClient } from '@/models/http-client/HttpClient';
import { instanceToPlain } from 'class-transformer';

interface FileValueRepositoryUrls {
  getDifferences: string;
}

const urls: FileValueRepositoryUrls = {
  getDifferences: process.env.BACKEND_COMPARE_VALUES_URL as string,
};

/**
 * Repository handling file value related operations.
 */
export class FileValueRepository {
  private readonly urls = urls;

  /**
   * Returns the differences between two values of files.
   * @param {FileValuesModel[]} fileValues Values of the files to compare.
   */
  public async getDifferences(
    fileValues: FileValuesModel[]
  ): Promise<ApiResponseModel<ComparedValuesModel>> {
    const payload = {
      values: instanceToPlain(fileValues),
    };

    const r = await HttpClient.setUrl(this.urls.getDifferences)
      .setMethodPost()
      .setPayload(payload)
      .call();

    const result = await r.json();
    return ApiResponseModel.fromJsonWithClass<ComparedValuesModel>(
      result,
      ComparedValuesModel
    );
  }
}
