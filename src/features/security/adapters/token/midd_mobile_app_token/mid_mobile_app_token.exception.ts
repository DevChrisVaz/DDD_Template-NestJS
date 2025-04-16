import { JSONAPIException } from 'core/json_api.exception';

export class MidMobileAppTokenException extends JSONAPIException {
  constructor(exception: TMidMobileAppTokenException) {
    super({
      hideDetails: true,
      code: exception.code,
      detail: exception.detail,
      status: exception.status.toString(),
      suggestion: exception.suggestion,
      title: exception.title,
    });
  }
}

export type TMidMobileAppTokenExceptions = {
  errors: TMidMobileAppTokenException[];
};

export type TMidMobileAppTokenException = {
  name: string;
  title: string;
  code: string;
  status: number;
  detail: string;
  suggestion: string;
  source: {
    pointer: string;
  }[];
};

export type TMidMobileAppTokenExceptionResponse = {
  message: string;
};
