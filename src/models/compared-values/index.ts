import { Expose, Type } from 'class-transformer';
import {
  KeyDifferencesInterface,
  KeyDifferencesModel,
} from '@/models/key-differences';
import {
  ValueDifferencesModel,
  ValueDifferencesInterface,
} from '@/models/value-differences';

interface ComparedValuesInterface {
  keyDifferences: KeyDifferencesInterface;
  valueDifferences: ValueDifferencesInterface[];
}

/**
 * Represents a file used for comparison.
 */
class ComparedValuesModel implements ComparedValuesInterface {
  @Type(() => KeyDifferencesModel)
  private readonly key_differences: KeyDifferencesModel;

  @Type(() => ValueDifferencesModel)
  private readonly value_differences: ValueDifferencesModel[];

  /**
   * @param {KeyDifferencesModel} keyDifferences Keys that are unique to each file.
   * @param {ValueDifferencesModel[]} valueDifferences Keys that exists in both files, with same or different values.
   */
  constructor(
    keyDifferences: KeyDifferencesModel,
    valueDifferences: ValueDifferencesModel[]
  ) {
    this.key_differences = keyDifferences;
    this.value_differences = valueDifferences;
  }

  /**
   * Returns the keys that are unique to each file.
   */
  @Expose({ name: 'keyDifferences', toClassOnly: true })
  public get keyDifferences(): KeyDifferencesModel {
    return this.key_differences;
  }

  /**
   * Returns the keys that exists in both files, with same or different values.
   */
  @Expose({ name: 'valueDifferences', toClassOnly: true })
  public get valueDifferences(): ValueDifferencesModel[] {
    return this.value_differences;
  }
}

export { ComparedValuesModel };
export type { ComparedValuesInterface };
