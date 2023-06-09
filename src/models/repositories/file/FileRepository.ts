import { instanceToPlain } from 'class-transformer';
import { ComparableFileModel } from '@/models/comparable-file';
import { ApiResponseModel } from '@/models/api-response';
import { httpClient } from '@/models/http-client/HttpClient';
import { FileValuesModel } from '@/models/file-values';

interface FileRepositoryUrls {
  getValues: string;
}

const urls: FileRepositoryUrls = {
  getValues: process.env.BACKEND_GET_FILE_VALUES_URL as string,
};

/**
 * Repository handling file related operations.
 */
export class FileRepository {
  private readonly urls = urls;

  /**
   * Returns the values of a file.
   * @param {ComparableFileModel} file File to get values from.
   */
  public async getValues(
    file: ComparableFileModel
  ): Promise<ApiResponseModel<FileValuesModel>> {
    const payload = {
      file: instanceToPlain(file),
    };

    const r = await httpClient
      .setUrl(this.urls.getValues)
      .setMethodPost()
      .setPayload(payload)
      .call();

    const result = await r.json();
    return ApiResponseModel.fromJsonWithClass<FileValuesModel>(
      result,
      FileValuesModel
    );
  }
}
