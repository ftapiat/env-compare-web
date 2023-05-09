import { ComparableFileModel } from '@/models/comparable-file';
import { ApiResponseModel } from '@/models/api-response';
import { HttpClient } from '@/models/http-client/HttpClient';
import { instanceToPlain, plainToInstance } from 'class-transformer';

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
  private urls = urls;

  public async getValues(
    file: ComparableFileModel
  ): Promise<ApiResponseModel<any>> {
    const payload = {
      file: instanceToPlain(file),
    };

    const r = await HttpClient.setUrl(this.urls.getValues)
      .setMethodPost()
      .setPayload(payload)
      .call();

    const result = await r.json();
    return ApiResponseModel.fromJson<object>(
      result,
      (data) => plainToInstance(Object, data) // Todo cast to model
    );
  }
}
