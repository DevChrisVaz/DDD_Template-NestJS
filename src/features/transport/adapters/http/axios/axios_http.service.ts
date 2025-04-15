import { AxiosRequestConfig, AxiosResponse, isAxiosError, AxiosInstance } from 'axios';
import { HTTPService, HTTPResult, HTTPMethod } from '../../../ports/http.service.port';
import { TCallOptions } from 'src/features/transport/ports/types/call_options.type';
import { TRequestOptions } from 'src/features/transport/ports/types/request_options.type';

export class AxiosHTTPService implements HTTPService {
  constructor(private client: AxiosInstance) {}

  async call<T, E>(method: HTTPMethod, url: string, { body, params, options }: TRequestOptions): Promise<HTTPResult<T>> {
    const axiosOptions = this._mapAxiosOptions(options);
    switch (method) {
      case HTTPMethod.GET:
        return this._get<T, E>(url, { params, options: axiosOptions });
      case HTTPMethod.POST:
        return this._post<T, E>(url, { body, params, options: axiosOptions });
      case HTTPMethod.PUT:
        return this._put<T, E>(url, { body, params, options: axiosOptions });
      case HTTPMethod.DELETE:
        return this._delete<T, E>(url, { params, options: axiosOptions });
      case HTTPMethod.PATCH:
        return this._patch<T, E>(url, { body, params, options: axiosOptions });
    }
  }

  private async _get<T, E>(url: string, { options, params }: { params?: Record<string, any>; options?: AxiosRequestConfig }): Promise<HTTPResult<T, E>> {
    try {
      const response = await this.client.get<T>(url, {
        params,
        ...options,
      });
      return this._mapResponse(response);
    } catch (error) {
      if (isAxiosError(error)) {
        return this._mapResponse(error.response);
      }

      return this._mapResponse();
    }
  }

  private async _post<T, E>(
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
  ): Promise<HTTPResult<T, E>> {
    try {
      const response = await this.client.post<T>(url, body, {
        params,
        ...options,
      });

      return this._mapResponse(response);
    } catch (error) {
      if (isAxiosError(error)) {
        return this._mapResponse(error.response);
      }

      return this._mapResponse();
    }
  }

  private async _put<T, E>(
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
  ): Promise<HTTPResult<T, E>> {
    try {
      const response = await this.client.put<T>(url, body, {
        params,
        ...options,
      });

      return this._mapResponse(response);
    } catch (error) {
      if (isAxiosError(error)) {
        return this._mapResponse(error.response);
      }

      return this._mapResponse();
    }
  }

  private async _delete<T, E>(
    url: string,
    {
      params,
      options,
    }: {
      params?: Record<string, any>;
      options?: AxiosRequestConfig;
    },
  ): Promise<HTTPResult<T, E>> {
    try {
      const response = await this.client.delete<T>(url, {
        params,
        ...options,
      });

      return this._mapResponse(response);
    } catch (error) {
      if (isAxiosError(error)) {
        return this._mapResponse(error.response);
      }

      return this._mapResponse();
    }
  }

  private async _patch<T, E>(
    url: string,
    {
      body,
      params,
      options,
    }: {
      body?: object;
      params?: object;
      options?: AxiosRequestConfig;
    },
  ): Promise<HTTPResult<T, E>> {
    try {
      const response = await this.client.patch<T>(url, body, {
        params,
        ...options,
      });

      return this._mapResponse(response);
    } catch (error) {
      if (isAxiosError(error)) {
        return this._mapResponse(error.response);
      }

      return this._mapResponse();
    }
  }

  private _mapResponse<T, E>(response?: AxiosResponse): HTTPResult<T, E> {
    if (response != null && response.status < 500) {
      if (response.status >= 200 && response.status <= 300) {
        return {
          type: 'Succeeded',
          data: response.data as T,
        };
      } else {
        return {
          type: 'Failed',
          ...(response.data as E),
        };
      }
    } else {
      return {
        type: 'Error',
        message: 'Ocurrió un error inesperado',
      };
    }
  }

  private _mapAxiosOptions(options?: TCallOptions): AxiosRequestConfig {
    const axiosOptions: AxiosRequestConfig = {
      ...options,
    };

    return axiosOptions;
  }
}
