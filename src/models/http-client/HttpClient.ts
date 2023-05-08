import { HttpClientModel } from './HttpClient.model';
import { FetchHttpClientModel } from './FetchHttpClient.model';

export const HttpClient: HttpClientModel = new FetchHttpClientModel();
