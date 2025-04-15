import { TFilters } from 'src/features/database/ports/types/filter.type';
import { And, Equal, FindOperator, FindOptionsWhere, ILike, In, LessThan, MoreThan, Not, Or } from 'typeorm';

export class TypeORMFilterService {
  static applyFilters<T extends object>(filters: TFilters<T>): FindOptionsWhere<T> {
    const filter: FindOptionsWhere<T> = {};

    Object.entries(filters).forEach(([field, condition]: [string, string | number | Date | boolean | object]) => {
      if (condition) {
        if (typeof condition === 'object') {
          filter[field] = this._applyConditions(Object.entries(condition));
        } else {
          filter[field] = condition;
        }
      }
    });

    return filter;
  }

  private static _applyConditions(conditions: object[]): FindOperator<unknown> {
    return conditions.map(([operator, value]: [string, string | number | Date | boolean | Array<string | number | Date | object> | null]) => {
      switch (operator) {
        case 'eq':
          return Equal(value);
        case 'ne':
          return Not(Equal(value));
        case 'like':
          return ILike(value);
        case 'in':
          return In(typeof value === 'boolean' ? [null] : Array.isArray(value) ? value : [value]);
        case 'lt':
          return LessThan(value);
        case 'gt':
          return MoreThan(value);
        case 'and':
          return And(this._applyConditions(value as object[]));
        case 'or':
          return Or(this._applyConditions(value as object[]));
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }
    })[0];
  }
}
