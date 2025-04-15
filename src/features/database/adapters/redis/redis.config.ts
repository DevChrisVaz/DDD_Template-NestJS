import { ConfigModule } from '@nestjs/config';

export const REDIS_CONFIG: string = 'REDIS_CONFIG';

export interface IRedisConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  idApp: string;
}

export const RedisConfig = ConfigModule.forFeature(
  (): { [key: string]: IRedisConfig } => ({
    [REDIS_CONFIG]: {
      host: process.env.REDIS_HOST || '',
      port: +(process.env.REDIS_PORT || 0),
      user: process.env.REDIS_USER || '',
      pass: process.env.REDIS_PASS || '',
      idApp: 'BACK_AUTH_APP',
    },
  }),
);
