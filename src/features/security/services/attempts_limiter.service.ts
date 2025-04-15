import { CacheService } from 'src/features/database/ports/cache.service.port';

export type TAttemptsLimiterServiceParams = {
  identifier: string;
  options: {
    maxAttempts: number;
    blockingTime: number; // in seconds
  };
};

export class AttemptsLimiterService {
  constructor(private readonly _cacheService: CacheService) {}

  async exec(params: TAttemptsLimiterServiceParams) {
    let attempts = Number(await this._cacheService.get(params.identifier, ':ATTEMPTS'));
    attempts = attempts ? attempts + 1 : 1;

    let fails = Number(await this._cacheService.get(params.identifier, ':FAILS'));
    if (attempts === params.options.maxAttempts) {
      fails = fails ? fails + 1 : 1;
      await this._cacheService.del(params.identifier, ':ATTEMPTS');
      await this._cacheService.set(params.identifier, fails.toString(), 60 * 12, ':FAILS');
      await this._cacheService.set(params.identifier, 'BLOCKED', params.options.blockingTime * fails, ':BLOCKED');
    } else {
      await this._cacheService.set(params.identifier, attempts.toString(), 60 * 12, ':ATTEMPTS');
    }
  }
}
