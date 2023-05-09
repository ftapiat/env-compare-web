import { HttpMethod } from './HttpMethod';

/**
 * Model to call an API
 */
export abstract class HttpClientModel {
  protected url = '';
  protected payload: unknown = {};
  protected method: HttpMethod = HttpMethod.GET;

  /**
   * Set the url to call
   * @param {string} url
   * @return {HttpClientModel}
   */
  public setUrl(url: string): HttpClientModel {
    this.url = url;
    return this;
  }

  /**
   * Set the payload to send
   * @param {any} payload
   * @return {HttpClientModel}
   */
  public setPayload(payload: unknown): HttpClientModel {
    this.payload = payload;
    return this;
  }

  /**
   * Set the method to GET
   * @return {HttpClientModel}
   */
  public setMethodGet(): HttpClientModel {
    return this.setMethod(HttpMethod.GET);
  }

  /**
   * Set the method to POST
   * @return {HttpClientModel}
   */
  public setMethodPost(): HttpClientModel {
    return this.setMethod(HttpMethod.POST);
  }

  /**
   * Set the method to use
   * @param {HttpMethod} method
   * @return {HttpClientModel}
   * @private
   */
  private setMethod(method: HttpMethod): HttpClientModel {
    this.method = method;
    return this;
  }

  /**
   * Call the API using the given parameters
   * @return {Promise}
   */
  public abstract call(): Promise<Response>;
}
