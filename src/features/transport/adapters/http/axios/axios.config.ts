import { ConfigModule } from '@nestjs/config';

export const AxiosConfig = ConfigModule.forFeature(() => ({
  timeout: 15000,
}));
