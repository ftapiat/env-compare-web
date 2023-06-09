export interface ApiResponseSimilarStructure {
  service: string;
  message: string;
}

export interface ApiResponseJsonStructure extends ApiResponseSimilarStructure {
  data: unknown;
  status: string;
}
