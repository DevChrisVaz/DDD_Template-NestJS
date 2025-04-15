import { TCallOptions } from './call_options.type';

export type TRequestOptions = {
  body?: Record<string, any>;
  params?: Record<string, any>;
  options?: TCallOptions;
};
