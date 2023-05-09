import { FileValuesModel } from '@/models/file-values';

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
  private urls = urls;

  public async getDifferences(fileValues: FileValuesModel[]): Promise {}
}
