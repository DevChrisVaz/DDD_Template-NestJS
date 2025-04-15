import { TFindOneOptions, TFindOptions } from './types/find_options.type';

export abstract class Repository<T extends object> {
  abstract find(options?: TFindOptions<T>): Promise<T[]>;
  abstract findOne(options: TFindOneOptions<T>): Promise<T | null>;
}
