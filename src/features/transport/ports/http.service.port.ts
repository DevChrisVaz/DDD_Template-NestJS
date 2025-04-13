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
  abstract call<T = void, E = void>(
    method: HTTPMethod,
    url: string,
    extra?: {
      body?: Record<string, any>;
      params?: Record<string, any>;
      options?: any;
    },
  ): Promise<HTTPResult<T, E>>;
}
