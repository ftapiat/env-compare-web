import { Expose, Type } from 'class-transformer';

interface ValueDifferencesContentInterface {
  string: string;
  indexDifferences: number[];
}

/**
 * Represents the differences found in a KEY between 2 files.
 */
class ValueDifferencesContentModel implements ValueDifferencesContentInterface {
  public readonly string: string;
  private readonly index_differences: number[];

  /**
   * @param {string} string Value used in the line of one file.
   * @param {number[]} indexDifferences Differences found in the value when
   * compared to the other value (from the second file).
   */
  constructor(string: string, indexDifferences: number[]) {
    this.string = string;
    this.index_differences = indexDifferences;
  }

  /**
   * Returns the differences found in the value when compared to the other value (from the second file).
   */
  @Expose({ name: 'indexDifferences', toClassOnly: true })
  public get indexDifferences(): number[] {
    return this.index_differences;
  }
}

interface ValueDifferencesInterface {
  key: string;
  file1: ValueDifferencesContentInterface;
  file2: ValueDifferencesContentInterface;
}

/**
 * Represents the differences found in values from the same key between 2 files.
 */
class ValueDifferencesModel implements ValueDifferencesInterface {
  public readonly key: string;
  @Type(() => ValueDifferencesContentModel)
  private readonly file_1: ValueDifferencesContentModel;

  @Type(() => ValueDifferencesContentModel)
  private readonly file_2: ValueDifferencesContentModel;

  /**
   * @param {string} key Key used in the line of one file for comparison.
   * @param {ValueDifferencesContentModel} file1 Value used in the line of the first file.
   * @param {ValueDifferencesContentModel} file2 Value used in the line of the second file.
   */
  constructor(
    key: string,
    file1: ValueDifferencesContentModel,
    file2: ValueDifferencesContentModel
  ) {
    this.key = key;
    this.file_1 = file1;
    this.file_2 = file2;
  }

  /**
   * Returns the value used in the line of the first file.
   */
  @Expose({ name: 'file1', toClassOnly: true })
  public get file1(): ValueDifferencesContentModel {
    return this.file_1;
  }

  /**
   * Returns the value used in the line of the second file.
   */
  @Expose({ name: 'file2', toClassOnly: true })
  public get file2(): ValueDifferencesContentModel {
    return this.file_2;
  }
}

export { ValueDifferencesContentModel, ValueDifferencesModel };
export type { ValueDifferencesContentInterface, ValueDifferencesInterface };
