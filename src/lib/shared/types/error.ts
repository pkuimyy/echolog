export type FetchError = Error & { code?: number };

export function createFetchError(message: string, code: number): FetchError {
  const error = new Error(message) as FetchError;
  error.code = code;
  return error;
}

export interface ErrorResponse {
  message?: string;
}