import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HTTPMethod, HTTPResult, HTTPService } from 'src/transport/ports/http.service.port';
import { AxiosHTTPService } from './axios_http.service';

export const AxiosJsonApiHttpServiceToken = 'AxiosJsonApiHttpServiceToken';
export class AxiosJsonApiHttpService extends AxiosHTTPService implements HTTPService {
  override async call<T, E>(
    method: HTTPMethod,
    url: string,
    {
      body,
      params,
      options,
    }: {
      body?: Record<string, any>;
      params?: Record<string, any>;
      options?: AxiosRequestConfig;
    },
  ): Promise<HTTPResult<T>> {
    switch (method) {
      case HTTPMethod.GET:
        return this._get<T, E>(url, params, options);
      case HTTPMethod.POST:
        return this._post<T, E>(url, { body, params, options });
      case HTTPMethod.PUT:
        return this._put<T, E>(url, { body, params, options });
      case HTTPMethod.DELETE:
        return this._delete<T, E>(url, { params, options });
      case HTTPMethod.PATCH:
        return this._patch<T, E>(url, { body, params, options });
    }
  }

  override _mapResponse<T, E>(response?: AxiosResponse<T & { errors?: E[] }>): HTTPResult<T, E> {
    if (response != null && response.status < 500) {
      if (response.status >= 200 && response.status <= 300 && !response.data.errors) {
        return {
          type: 'Succeeded',
          data: response.data as T,
        };
      } else {
        return {
          type: 'Failed',
          ...response.data.errors![0],
        };
      }
    } else {
      return {
        type: 'Error',
        message: 'Ocurrió un error inesperado',
      };
    }
  }
}
