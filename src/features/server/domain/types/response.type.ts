import { TResource } from './resource.type';
import { TIncluded } from './included.type';
import { TLinks } from './links.type';
import { TJSONAPI } from './jsonapi.type';
import { TError } from './error.type';

type TResponse = {
  jsonapi?: TJSONAPI;
  links?: TLinks;
  meta?: Record<string, any>;
};

export type TSuccessResponse<T, R = any> = {
  data: TResource<T, R> | Array<TResource<T, R>>;
  included?: Array<TIncluded>;
} & TResponse;

export type TErrorResponse = {
  errors?: Array<TError>;
} & TResponse;
