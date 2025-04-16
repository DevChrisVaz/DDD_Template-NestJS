import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HTTPService, HTTPMethod } from 'src/features/transport/ports/http.service.port';
import { TokenService } from '../../../ports/token.service.port';
import { EncryptionService } from '../../../ports/encryption.service.port';
import {
  IMiddMobileAppTokenConfig,
  MIDD_MOBILE_APP_TOKEN_CONFIG,
} from './midd_mobile_app_token.config';
import {
  MidMobileAppTokenException,
  TMidMobileAppTokenExceptionResponse,
  TMidMobileAppTokenExceptions,
} from './mid_mobile_app_token.exception';
import { IData } from 'core/entities/data';
import { UnavailbleServiceException } from 'src/features/transport/exceptions/unavailableService.exception';

export interface IMiddMobileAppTokenPayload {
  uuid: string;
}

@Injectable()
export class MiddMobileAppTokenService implements TokenService {
  constructor(
    private readonly _apiRestClientService: HTTPService,
    private readonly _configService: ConfigService,
    private readonly _encryptionService: EncryptionService,
  ) {}

  async generateToken<T>(payload: T): Promise<string> {
    const config = this._configService.getOrThrow<IMiddMobileAppTokenConfig>(
      MIDD_MOBILE_APP_TOKEN_CONFIG,
    );

    const response = await this._apiRestClientService.call<
      {
        encrypted: string;
      },
      TMidMobileAppTokenExceptions
    >(HTTPMethod.POST, config.url + '/token_generator', {
      body: {
        encrypted: this._encryptionService.encrypt(
          JSON.stringify({
            data: {
              type: 'ServiceUserAuth',
              attributes: payload,
            },
          }),
          config.cipherKey,
        ),
      },
      options: {
        headers: {
          contentType: config.contentType,
        },
      },
    });

    if (response.type === 'Failed')
      throw new MidMobileAppTokenException(response.errors[0]);

    if (response.type === 'Error')
      throw new UnavailbleServiceException(config.url);

    const responseData = JSON.parse(
      await this._encryptionService.decrypt(
        response.data.encrypted,
        config.cipherKey,
      ),
    ) as { data: IData<null> };

    return JSON.stringify(responseData.data.attributes);
  }
  async verifyToken<T = IMiddMobileAppTokenPayload>(token: string): Promise<T> {
    const config = this._configService.getOrThrow<IMiddMobileAppTokenConfig>(
      MIDD_MOBILE_APP_TOKEN_CONFIG,
    );
    const response = await this._apiRestClientService.call<
      { data: IData<T> },
      TMidMobileAppTokenExceptionResponse | TMidMobileAppTokenExceptions
    >(HTTPMethod.POST, config.url + '/token_validate', {
      options: {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': config.contentType,
        },
      },
    });

    if (response.type === 'Failed') {
      if ('errors' in response)
        throw new MidMobileAppTokenException(response.errors[0]);

      throw new MidMobileAppTokenException({
        detail: 'El token no es valido',
        name: 'InvalidTokenException',
        source: [],
        status: 401,
        suggestion: 'Intente con un nuevo token.',
        title: 'Sin autorización.',
        code: 'MidMobileAppTokenException',
      });
    }

    if (response.type === 'Error')
      throw new UnavailbleServiceException(config.url);

    return response.data.data.attributes;
  }
}
