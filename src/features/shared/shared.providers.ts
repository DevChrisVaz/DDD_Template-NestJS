import { Provider } from '@nestjs/common';
import { UUIDService } from './ports/uuid.service.port';
import { UUIDServiceAdapter } from './adapters/uuid/uuid.service.adapter';

export const SharedProviders: Provider[] = [
  {
    provide: UUIDService,
    useClass: UUIDServiceAdapter,
  },
];
