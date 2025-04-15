import { TRequestOptions } from './types/request_options.type';

export enum HTTPMethod {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
}

type Succeeded<T> = {
  type: 'Succeeded';
  data: T;
};

type Failed<T> = {
  type: 'Failed';
} & T;

type Error = {
  type: 'Error';
  message: string;
};

export type HTTPResult<T = void, E = void> = Succeeded<T> | Failed<E> | Error;

export abstract class HTTPService {
  abstract call<T = void, E = void>(method: HTTPMethod.GET, url: string, options?: Omit<TRequestOptions, 'body'>): Promise<HTTPResult<T, E>>;

  abstract call<T = void, E = void>(method: Exclude<HTTPMethod, HTTPMethod.GET>, url: string, options?: TRequestOptions): Promise<HTTPResult<T, E>>;
}
