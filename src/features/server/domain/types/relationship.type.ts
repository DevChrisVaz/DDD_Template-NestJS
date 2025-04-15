import { TRequestResource, TResource } from './resource.type';
import { TLinks } from './links.type';

export type TRelationship<R> = {
  /**
   * a links object containing at least one of the following.
   * @type {TLinks}
   */
  links?: TLinks;
  /**
   * a resource linkage.
   * @type {TResource<R>}
   */
  data?: TResource<R>;
  /**
   * a meta object that contains non-standard meta-information about the relationship.
   * @type {Record<string, any>}
   */
  meta?: Record<string, any>;
};

export type TRequestRelationship<R> = {
  /**
   * a resource linkage.
   * @type {TResource<R>}
   */
  data?: TRequestResource<R>;
};
