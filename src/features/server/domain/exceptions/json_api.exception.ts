import { TError, TErrorSource } from '../types/error.type';
import { TErrorLink } from '../types/links.type';

export abstract class JSONAPIException extends Error implements TError {
  id?: string | undefined;
  links?: TErrorLink | undefined;
  status: string;
  code?: string | undefined;
  title?: string | undefined;
  detail?: string | undefined;
  source?: TErrorSource | undefined;
  meta?: Record<string, any> | undefined;

  constructor(exception: TError) {
    super(exception.title);
    Object.assign(this, exception);
  }
}
