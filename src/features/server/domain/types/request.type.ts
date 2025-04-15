import { TJSONAPI } from './jsonapi.type';
import { TRequestResource } from './resource.type';

export type TRequest<T, R = any> = {
  /**
   * a jsonapi object.
   * @type {TJSONAPI}
   */
  jsonapi?: TJSONAPI;
  /**
   * the request document’s “primary data”.
   * @type {TRequestResource<T, R>}
   */
  data: TRequestResource<T, R>;
  /**
   * a meta object that contains non-standard meta-information.
   * @type {Record<string, any>}
   */
  meta?: Record<string, any>;
};
