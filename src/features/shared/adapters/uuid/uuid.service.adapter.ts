import { UUIDService } from 'src/features/shared/ports/uuid.service.port';
import { v4, v7 } from 'uuid';

export class UUIDServiceAdapter implements UUIDService {
  generateV4(): string {
    return v4();
  }
  generateV7(): string {
    return v7();
  }
}
