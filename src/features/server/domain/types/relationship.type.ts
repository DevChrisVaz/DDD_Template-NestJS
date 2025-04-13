import { TRequestResource, TResource } from './resource.type';
import { TLinks } from './links.type';

export type TRelationship<R> = {
  links?: TLinks;
  data?: TResource<R>;
  meta?: Record<string, any>;
};

export type TRequestRelationship<R> = {
  data?: TRequestResource<R>;
};
