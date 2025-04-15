export type TJSONAPI = {
  /**
   * whose value is a string indicating the highest JSON:API version supported.
   * @type {string}
   */
  version?: string;

  /**
   * an array of URIs for all applied extensions.
   * @type {Array<string>}
   */
  ext?: Array<string>;

  /**
   * an array of URIs for all applied profiles.
   * @type {Array<string>}
   */
  profile?: Array<string>;

  /**
   * a meta object that contains non-standard meta-information.
   * @type {Record<string, any>}
   */
  meta?: Record<string, any>;
};
