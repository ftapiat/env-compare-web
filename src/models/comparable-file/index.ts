interface ComparableFileInterface {
  name: string;
  content: string;
}

/**
 * Represents a file used for comparison.
 */
export class ComparableFileModel implements ComparableFileInterface {
  public name: string;
  public content: string;

  /**
   * @param {string} name Name of the file
   * @param {string} content Content of the file as plain text
   */
  constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
  }
}
