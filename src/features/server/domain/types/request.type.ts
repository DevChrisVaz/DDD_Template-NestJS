import { TJSONAPI } from './jsonapi.type';
import { TRequestResource } from './resource.type';

export type TRequest<T, R = any> = {
  jsonapi?: TJSONAPI;
  data: TRequestResource<T, R>;
  meta?: Record<string, any>;
};
