import Redis from 'ioredis';
import { CacheService } from '../../ports/cache.service.port';
import { KeyDoesNotExistException } from '../../exceptions/key_does_not_exist.exception';

export class RedisCacheService implements CacheService {
  constructor(private readonly redisClient: Redis) {}

  async get<T extends Record<string, any> | string | number | boolean>(key: string, directory?: string): Promise<T | null> {
    const value = await this.redisClient.get([directory, key].join(':'));
    if (!value) return null;
    return JSON.parse(value) as T;
  }

  async set<T extends Record<string, any> | string | number | boolean>(key: string, value: T, ttl: number, directory?: string): Promise<void> {
    await this.redisClient.set([directory, key].join(':'), JSON.stringify(value), 'EX', ttl);
    return;
  }

  async getEx(key: string, directory?: string): Promise<number | null> {
    const ttl = await this.redisClient.ttl([directory, key].join(':'));
    if (ttl === -2) {
      throw new KeyDoesNotExistException({ key });
    } else if (ttl === -1) {
      return null;
    } else {
      return ttl;
    }
  }

  async del(key: string, directory?: string): Promise<void> {
    await this.redisClient.del([directory, key].join(':'));
  }
}
