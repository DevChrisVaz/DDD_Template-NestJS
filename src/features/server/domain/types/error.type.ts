import { TErrorLink } from './links.type';

export type TErrorSource = {
  pointer?: string;
  parameter?: string;
  header?: string;
};

export type TError = {
  id?: string;
  links?: TErrorLink;
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: TErrorSource;
  meta?: Record<string, any>;
};
