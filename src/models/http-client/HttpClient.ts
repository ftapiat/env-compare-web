import { HttpClientModel } from './HttpClient.model';
import { FetchHttpClientModel } from './FetchHttpClient.model';

export const httpClient: HttpClientModel = new FetchHttpClientModel();
