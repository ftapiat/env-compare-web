import { Exclude, Expose } from 'class-transformer';

interface FileValuesContent {
  key: string;
  value: string;
}

/**
 * Represents a file used for comparison.
 */
export class FileValuesModel {
  private readonly file_name: string;

  private readonly type_name: string;
  public readonly values: FileValuesContent[];

  /**
   * @param {string} fileName Name of the file
   * @param {string} typeName Type of the file used for comparison
   * @param {FileValuesContent[]} values Values of the file
   */
  constructor(fileName: string, typeName: string, values: FileValuesContent[]) {
    this.file_name = fileName;
    this.type_name = typeName;
    this.values = values;
  }

  /**
   * Returns the name of the file.
   * @return {string}
   */
  @Expose({ name: 'fileName', toClassOnly: true })
  get fileName(): string {
    return this.file_name;
  }

  /**
   * Returns the type of the file.
   * @return {string}
   */
  @Expose({ name: 'typeName', toClassOnly: true })
  get typeName(): string {
    return this.type_name;
  }
}
