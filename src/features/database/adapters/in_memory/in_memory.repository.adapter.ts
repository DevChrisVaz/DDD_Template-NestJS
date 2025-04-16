import { Repository } from '../../ports/repository.port';
import { TFindOneOptions, TFindOptions } from '../../ports/types/find_options.type';

export abstract class InMemoryRepository<T extends object> implements Repository<T> {
  private _registries: T[] = [];

  async find(options?: TFindOptions<T>): Promise<T[]> {
    if (options?.filter) {
      return await new Promise<T[]>((resolve) => {
        const result = this._registries.filter((obj) => Object.entries(options.filter!).every(([key, value]) => obj[key as keyof T] === value));
        resolve(result);
      });
    }

    return await new Promise<T[]>((resolve) => {
      return resolve(this._registries);
    });
  }

  async findOne(options: TFindOneOptions<T>): Promise<T | null> {
    const registry = await new Promise<T | null>((resolve) => {
      const result = this._registries.find((obj) => Object.entries(options.filter).every(([key, value]) => obj[key as keyof T] === value));
      resolve(result ?? null);
    });

    return registry;
  }
}
