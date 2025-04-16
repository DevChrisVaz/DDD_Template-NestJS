import { ConfigModule } from '@nestjs/config';

export const MIDD_MOBILE_APP_TOKEN_CONFIG = 'MIDD_MOBILE_APP_TOKEN_CONFIG';

export interface IMiddMobileAppTokenConfig {
  url: string;
  contentType: string;
  cipherKey: string;
  user: string;
  password: string;
  project: string;
}

export const MiddMobileAppTokenConfig = ConfigModule.forFeature(
  (): {
    [token: string]: IMiddMobileAppTokenConfig;
  } => ({
    [MIDD_MOBILE_APP_TOKEN_CONFIG]: {
      url: process.env.MIDD_MOBILE_APP_TOKEN_URL!,
      contentType: process.env.CONTENT_TYPE!,
      cipherKey: process.env.MIDD_MOBILE_APP_TOKEN_CIPHER_KEY!,
      user: process.env.MIDD_MOBILE_APP_TOKEN_USER!,
      password: process.env.MIDD_MOBILE_APP_TOKEN_PASS!,
      project: process.env.MIDD_MOBILE_APP_TOKEN_PROJECT!,
    },
  }),
);
