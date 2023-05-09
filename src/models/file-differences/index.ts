import { FileValuesModel } from '@/models/file-values';
import { Exclude, Expose, Type } from 'class-transformer';
import { ComparedValuesModel } from '@/models/compared-values';

/**
 * Represents the values of two files.
 */
class FileDifferencesValuesModel {
  @Type(() => FileValuesModel)
  private readonly file_1: FileValuesModel;

  @Type(() => FileValuesModel)
  private readonly file_2: FileValuesModel;

  /**
   * @param {FileValuesModel} file1 Values of the first file used for comparison.
   * @param {FileValuesModel} file2 Values of the second file used for comparison.
   */
  constructor(file1: FileValuesModel, file2: FileValuesModel) {
    this.file_1 = file1;
    this.file_2 = file2;
  }

  /**
   * Returns the values of the first file used for comparison.
   */
  @Expose({ name: 'file1', toClassOnly: true })
  public get file1(): FileValuesModel {
    return this.file_1;
  }

  /**
   * Returns the values of the second file used for comparison.
   */
  @Expose({ name: 'file2', toClassOnly: true })
  public get file2(): FileValuesModel {
    return this.file_2;
  }
}

/**
 * Represents the values of two files and its differences.
 */
class FileDifferencesModel {
  @Type(() => FileDifferencesValuesModel)
  public readonly values: FileDifferencesValuesModel;

  @Type(() => ComparedValuesModel)
  public readonly differences: ComparedValuesModel;

  /**
   * @param {FileDifferencesValuesModel} values
   * @param {ComparedValuesModel} differences
   */
  constructor(
    values: FileDifferencesValuesModel,
    differences: ComparedValuesModel
  ) {
    this.values = values;
    this.differences = differences;
  }
}

export { FileDifferencesModel, FileDifferencesValuesModel };
