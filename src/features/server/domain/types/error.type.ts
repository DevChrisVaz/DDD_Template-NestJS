import { TErrorLink } from './links.type';

export type TErrorSource = {
  /**
   * A JSON Pointer [RFC6901] to the value in the request document that caused the error.
   * This MUST point to a value in the request document that exists.
   * @type {string}
   */
  pointer?: string;
  /**
   * A string indicating which URI query parameter caused the error.
   * @type {string}
   */
  parameter?: string;
  /**
   * A string indicating the name of a single request header which caused the error.
   * @type {string}
   */
  header?: string;
};

export type TError = {
  /**
   * a unique identifier for this particular occurrence of the problem.
   * @type {string}
   */
  id?: string;
  /**
   * A links object that MAY contain the following members.
   * @type {TErrorLink}
   */
  links?: TErrorLink;
  /**
   * The HTTP status code applicable to this problem, expressed as a string value.
   * This SHOULD be provided.
   * @type {string}
   */
  status: string;
  /**
   * An application-specific error code, expressed as a string value.
   * @type {string}
   */
  code?: string;
  /**
   * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
   * @type {string}
   */
  title?: string;
  /**
   * A human-readable explanation specific to this occurrence of the problem.
   * Like title, this field’s value can be localized.
   * @type {string}
   */
  detail?: string;
  /**
   * An object containing references to the primary source of the error.
   * It SHOULD include one of the following members or be omitted:
   * @type {TErrorSource}
   */
  source?: TErrorSource;
  /**
   * A meta object containing non-standard meta-information about the error.
   * @type {Record<string, any>}
   */
  meta?: Record<string, any>;
};
