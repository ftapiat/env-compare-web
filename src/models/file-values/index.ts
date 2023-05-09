interface FileValuesContent {
  key: string;
  value: string;
}

/**
 * Represents a file used for comparison.
 */
export class FileValuesModel {
  public fileName: string;
  public typeName: string;
  public values: FileValuesContent[];

  /**
   * @param {string} fileName Name of the file
   * @param {string} typeName Type of the file used for comparison
   * @param {FileValuesContent[]} values Values of the file
   */
  constructor(fileName: string, typeName: string, values: FileValuesContent[]) {
    this.fileName = fileName;
    this.typeName = typeName;
    this.values = values;
  }
}
