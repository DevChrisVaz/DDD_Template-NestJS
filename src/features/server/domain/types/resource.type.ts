import { TLinks } from './links.type';
import { TRelationship, TRequestRelationship } from './relationship.type';

export type TResource<T, R = any> = {
  /**
   * the resource identifier.
   * This SHOULD be provided.
   * @type {string}
   */
  id: string;

  /**
   * the resource type.
   * This SHOULD be provided.
   * @type {string}
   */
  type: string;

  /**
   * an attributes object representing some of the resource’s data.
   * @type {T}
   */
  attributes?: T;

  /**
   * a relationships object describing relationships between the resource and other
   * JSON:API resources.
   * @type {Record<string, TRelationship<R>>}
   */
  relationships?: Record<string, TRelationship<R>>;

  /**
   * a links object containing links related to the resource.
   * @type {TLinks}
   */
  links?: TLinks;
};

export type TRequestResource<T, R = any> = {
  /**
   * the resource identifier.
   * @type {string}
   */
  id?: string;

  /**
   * the resource type.
   * This SHOULD be provided.
   * @type {string}
   */
  type: string;

  /**
   * an attributes object representing some of the resource’s data.
   * @type {T}
   */
  attributes?: T;

  /**
   * a relationships object describing relationships between the resource and other
   * JSON:API resources.
   * @type {Record<string, TRelationship<R>>}
   */
  relationships?: Record<string, TRequestRelationship<R>>;
};
