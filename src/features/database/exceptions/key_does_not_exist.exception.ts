import { JSONAPIException } from 'src/features/server/domain/exceptions/json_api.exception';

export class KeyDoesNotExistException extends JSONAPIException {
  constructor({ key }: { key: string }) {
    super({
      code: 'KeyDoesNotExistException',
      detail: `Key ${key} was not found in cache database.`,
      title: 'Key was not found',
      status: '404',
    });
  }
}
