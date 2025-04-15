import { TResource } from './resource.type';
import { TLinks } from './links.type';
import { TJSONAPI } from './jsonapi.type';
import { TError } from './error.type';

type TResponse = {
  /**
   * a jsonapi object.
   * @type {TJSONAPI}
   */
  jsonapi?: TJSONAPI;
  /**
   * a links object related to the document as a whole.
   * @type {TLinks}
   */
  links?: TLinks;
  /**
   * a meta object that contains non-standard meta-information.
   * @type {Record<string, any>}
   */
  meta?: Record<string, any>;
};

export type TSuccessResponse<T, R = any> = {
  /**
   * the document’s “primary data”.
   * @type {TResource<T, R> | Array<TResource<T, R>>}
   */
  data: TResource<T, R> | Array<TResource<T, R>>;
  /**
   * an array of resource objects that are related to the primary data and/or each
   * other (“included resources”).
   * @type {TResource<T, R> | Array<TResource<T, R>>}
   */
  included?: Array<TResource<any, any>>;
} & TResponse;

export type TErrorResponse = {
  /**
   * An array of error objects that describe the errors that occurred while performing
   * an operation.
   * @type {Array<TError>}
   */
  errors?: Array<TError>;
} & TResponse;
