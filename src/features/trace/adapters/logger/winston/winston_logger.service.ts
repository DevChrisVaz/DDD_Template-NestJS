import { LoggerService } from 'src/features/trace/ports/logger.service.port';
import { Logger } from 'winston';

export class WinstonLoggerService implements LoggerService {
  constructor(private readonly _logger: Logger) {}

  info(message: string, context?: any): void {
    this._logger.info(message, context);
  }
  warning(message: string, context?: any): void {
    this._logger.warning(message, context);
  }
  error(message: string, context?: any): void {
    this._logger.error(message, context);
  }
}
