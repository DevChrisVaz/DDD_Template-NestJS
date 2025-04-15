import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { IRedisConfig, REDIS_CONFIG } from './redis.config';

export const redisProvider: Provider = {
  provide: Redis,
  useFactory: (configService: ConfigService) => {
    const config = configService.getOrThrow<IRedisConfig>(REDIS_CONFIG);
    const redisInstance = new Redis({
      username: config.user,
      password: config.pass,
      host: config.host,
      port: config.port,
      keyPrefix: config.idApp + ':',
      tls: {},
    });

    redisInstance.on('error', (e) => {
      throw new Error(`Redis connection failed: ${e}`);
    });

    return redisInstance;
  },
  inject: [ConfigService],
};
