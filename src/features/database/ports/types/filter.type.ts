export type TStringOperators = 'eq' | 'like' | 'in';

export type TNumberOperators = 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte';

export type TDateOperators = 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte';

export type TBooleanOperators = 'eq' | 'ne';

export type TLogicalOperators = 'and' | 'or';

type XOR<T, U> = T | U extends object
  ? T extends object
    ? U extends object
      ?
          | (T & Partial<Record<keyof U, never>>)
          | (U & Partial<Record<keyof T, never>>)
      : T
    : U
  : T | U;

type SingleOperator<T extends string, Type = unknown> = {
  [K in T]: Type;
} extends infer U
  ? {
      [K in keyof U]: { [P in K]: U[P] } & Partial<
        Record<Exclude<keyof U, K>, never>
      >;
    }[keyof U]
  : never;

export type TStringOperator = XOR<
  SingleOperator<
    keyof { [Operator in TStringOperators]?: string | string[] | null },
    string | string[] | null
  >,
  SingleOperator<
    keyof {
      [Operator in TLogicalOperators]?: [
        TStringOperator,
        TStringOperator,
        ...TStringOperator[],
      ];
    },
    [TStringOperator, TStringOperator, ...TStringOperator[]]
  >
>;

export type TNumberOperator = XOR<
  SingleOperator<
    keyof { [Operator in TNumberOperators]?: number | number[] | null },
    number | number[] | null
  >,
  SingleOperator<
    keyof {
      [Operator in TLogicalOperators]?: [
        TNumberOperator,
        TNumberOperator,
        ...TNumberOperator[],
      ];
    },
    [TNumberOperator, TNumberOperator, ...TNumberOperator[]]
  >
>;

export type TDateOperator = XOR<
  SingleOperator<
    keyof { [Operator in TDateOperators]?: Date | null },
    Date | null
  >,
  SingleOperator<
    keyof {
      [Operator in TLogicalOperators]?: [
        TDateOperator,
        TDateOperator,
        ...TDateOperator[],
      ];
    },
    [TDateOperator, TDateOperator, ...TDateOperator[]]
  >
>;

export type TBooleanOperator = XOR<
  SingleOperator<
    keyof { [Operator in TBooleanOperators]?: boolean | null },
    boolean | null
  >,
  SingleOperator<
    keyof {
      [Operator in TLogicalOperators]?: [TBooleanOperator, TBooleanOperator];
    },
    [TBooleanOperator, TBooleanOperator]
  >
>;

export type TFilters<T extends object> = {
  [K in keyof T]?: T[K] extends string
    ? string | TStringOperator | null
    : T[K] extends number
      ? number | TNumberOperator | null
      : T[K] extends Date
        ? Date | TDateOperator | null
        : boolean | TBooleanOperator | null;
};
