import { HttpClientModel } from './HttpClient.model';
import { HttpMethod } from './HttpMethod';

/**
 * Model to call an API using the Fetch API
 */
export class FetchHttpClientModel extends HttpClientModel {
  /**
   * Call the API using the given parameters
   * @template T The type of the response
   * @return {Promise}
   */
  public async call<T>(): Promise<T> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const url = this.getParsedUrlFromMethod();
      const payload = this.getParsedBodyFromMethod();

      console.log(`[${this.method}] ${url}`);
      console.log('PAYLOAD', payload);

      const request = new Request(url, {
        method: this.method,
        headers,
        body: payload,
      });

      const response = await fetch(request);
      return (await response.json()) as Promise<T>;
    } catch (e) {
      console.error(e);
      throw e; // Todo transform to a custom error
    }
  }

  /**
   * Get the parsed url from the method.
   *
   * If the method is GET, the URL should have the payload as query params.
   *
   * If the method is other type, the URL should be the same as the one set
   * in the constructor.
   * @private
   * @return {string}
   */
  private getParsedUrlFromMethod(): string {
    if (this.method === HttpMethod.GET) {
      return this.makeUrlWithParams();
    }
    return this.url;
  }

  /**
   * Make the URL with the query params
   * @private
   * @return {string}
   */
  private makeUrlWithParams(): string {
    return this.url; // TODO
  }

  /**
   * Get the parsed body from the method.
   *
   * If the method is GET, the body should be empty.
   * @private
   * @return {string}
   */
  private getParsedBodyFromMethod(): string {
    if (this.method !== HttpMethod.GET) {
      return JSON.stringify(this.payload);
    }
    return '';
  }
}
