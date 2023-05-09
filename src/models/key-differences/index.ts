import { Exclude, Expose } from 'class-transformer';

/**
 * Represents the KEYS that are unique in each file.
 */
export class KeyDifferencesModel {
  private readonly file_1: string[];

  private readonly file_2: string[];

  /**
   * @param {string[]} file1 Keys that are unique to the first file.
   * @param {string[]} file2 Keys that are unique to the second file.
   */
  constructor(file1: string[], file2: string[]) {
    this.file_1 = file1;
    this.file_2 = file2;
  }

  /**
   * Returns the keys that are unique to the first file.
   */
  @Expose({ name: 'file1', toClassOnly: true })
  public get file1(): string[] {
    return this.file_1;
  }

  /**
   * Returns the keys that are unique to the second file.
   */
  @Expose({ name: 'file2', toClassOnly: true })
  public get file2(): string[] {
    return this.file_2;
  }
}
