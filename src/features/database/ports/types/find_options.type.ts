import { TFilters } from './filter.type';

export type TSelectFields<T> = {
  [K in keyof T]?: K extends object ? TSelectField<K> : boolean;
};

export type TSelectField<Field> = Field extends object
  ? TSelectFields<Field>
  : Field extends Array<infer I>
    ? TSelectField<I> | boolean
    : Field extends Promise<infer I>
      ? TSelectField<I>
      : Field extends typeof Function
        ? never
        : boolean;

export type TRelationFields<T> = {
  [K in keyof T]?: TRelationField<K>;
};

export type TRelationField<Field> = Field extends object
  ? TSelectField<Field> | boolean
  : never;

export type TFindOptions<T extends object> = {
  filter?: TFilters<T>;
  fields?: TSelectFields<T>;
  relations?: TRelationFields<T>;
};

export type TFindOneOptions<T extends object> = {
  filter: TFilters<T>;
  fields?: TSelectFields<T>;
  relations?: TRelationFields<T>;
};
