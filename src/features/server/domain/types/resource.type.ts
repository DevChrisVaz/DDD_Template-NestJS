import { TLinks } from './links.type';
import { TRelationship, TRequestRelationship } from './relationship.type';

export type TResource<T, R = any> = {
  id: string;
  type: string;
  attributes?: T;
  relationships?: Record<string, TRelationship<R>>;
  links?: TLinks;
};

export type TRequestResource<T, R = any> = {
  id?: string;
  type: string;
  attributes?: T;
  relationships?: Record<string, TRequestRelationship<R>>;
};
