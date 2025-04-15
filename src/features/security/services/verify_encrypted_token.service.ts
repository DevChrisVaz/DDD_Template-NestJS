import { EncryptionService } from '../ports/encryption.service.port';
import { TokenService } from '../ports/token.service.port';

export type TVerifyEncryptedTokenServiceParams = {
  token: string;
  key: string;
};

export type TVerifyEncryptedTokenServiceResponse<T> = T & { exp?: number };

export class VerifyEncryptedTokenService {
  constructor(
    private readonly _tokenService: TokenService,
    private readonly _encryptionService: EncryptionService,
  ) {}

  async exec<T extends Record<string, any>>(params: TVerifyEncryptedTokenServiceParams): Promise<TVerifyEncryptedTokenServiceResponse<T>> {
    const encryptedPayload: string = await this._tokenService.verifyToken<string>(params.token);

    const payload = await this._encryptionService.decrypt(encryptedPayload, params.key);

    return JSON.parse(payload) as TVerifyEncryptedTokenServiceResponse<T>;
  }
}
