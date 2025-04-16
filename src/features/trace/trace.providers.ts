import { Provider } from '@nestjs/common';
import { LoggerService } from './ports/logger.service.port';
import { WinstonLoggerService } from './adapters/logger/winston/winston_logger.service';
import { WinstonProvider } from './adapters/logger/winston/winston.provider';

export const TraceProviders: Provider[] = [
  {
    provide: LoggerService,
    useClass: WinstonLoggerService,
  },
  WinstonProvider,
];
