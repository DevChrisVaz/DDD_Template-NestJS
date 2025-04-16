import { Global, Module } from '@nestjs/common';
import { TraceProviders } from './trace.providers';
import { LoggerService } from './ports/logger.service.port';

@Global()
@Module({
  providers: TraceProviders,
  exports: [LoggerService],
})
export class TraceModule {}
