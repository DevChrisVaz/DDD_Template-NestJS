export type TLink = {
  /**
   * a string whose value is a URI-reference [RFC3986 Section 4.1] pointing to the link’s target.
   * This SHOULD be provided.
   * @type {string}
   */
  href: string;

  /**
   * a string indicating the link’s relation type. The string MUST be a valid link relation type.
   * @type {string}
   */
  rel?: string;

  /**
   * a link to a description document (e.g. OpenAPI or JSON Schema) for the link target.
   * @type {string}
   */
  decribedBy?: string;

  /**
   * a string which serves as a label for the destination of a link such that it can be 
  used as a human-readable identifier (e.g., a menu entry).
   * @type {string}
   */
  title?: string;

  /**
   * a string indicating the media type of the link’s target.
   * @type {string}
   */
  type?: string;

  /**
   * a string or an array of strings indicating the language(s) of the link’s target.
   * An array of strings indicates that the link’s target is available in multiple languages.
   * Each string MUST be a valid language tag [RFC5646].
   * @type {string | Array<string>}
   */
  hreflang?: string | Array<string>;

  /**
   * a meta object containing non-standard meta-information about the link.
   * @type {Record<string, any>}
   */
  meta?: Record<string, any>;
};

export type TPaginationLinks = {
  /**
   * the first page of data.
   * @type {Record<string, any>}
   */
  first?: string;

  /**
   *  the last page of data.
   * @type {Record<string, any>}
   */
  last?: string;

  /**
   * the previous page of data.
   * @type {Record<string, any>}
   */
  prev?: string;

  /**
   * the next page of data.
   * @type {Record<string, any>}
   */
  next?: string;
};

export type TLinks = {
  /**
   * he link that generated the current response document. If a document has extensions or
   * profiles applied to it, this link SHOULD be represented by a link object with the type
   * target attribute specifying the JSON:API media type with all applicable parameters.
   * @type {string}
   */
  self?: string;
  /**
   * a related resource link when the primary data represents a resource relationship.
   * @type {TLink}
   */
  related?: TLink;
  /**
   * a link to a description document (e.g. OpenAPI or JSON Schema) for the current document.
   * @type {string}
   */
  describedBy?: string;
  /**
   * links for the primary data.
   * @type {TPaginationLinks}
   */
  pagination?: TPaginationLinks;
};

export type TErrorLink = {
  /**
   * a link that leads to further details about this particular occurrence of the problem.
   * When dereferenced, this URI SHOULD return a human-readable description of the error.
   * @type {TLink}
   */
  about?: TLink;
  /**
   * a link that identifies the type of error that this particular error is an instance of.
   * This URI SHOULD be dereferenceable to a human-readable explanation of the general error.
   * @type {TLink}
   */
  type?: TLink;
};
