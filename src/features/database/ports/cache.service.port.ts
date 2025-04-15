export abstract class CacheService {
  abstract get<T extends Record<string, any> | string | number | boolean>(
    key: string,
    directory?: string,
  ): Promise<T | null>;
  abstract getEx(key: string, directory?: string): Promise<number | null>;
  abstract set<T extends Record<string, any> | string | number | boolean>(
    key: string,
    value: T,
    ttl: number,
    directory?: string,
  ): Promise<void>;
  abstract del(key: string, directory?: string): Promise<void>;
}
