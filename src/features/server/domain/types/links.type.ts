export type TLink = {
  href: string;
  rel?: string;
  decribedBy?: string;
  title?: string;
  type?: string;
  hreflang?: string | Array<string>;
  meta?: Record<string, any>;
};

export type TPaginationLinks = {
  first?: string;
  prev?: string;
  next?: string;
  last?: string;
};

export type TLinks = {
  self?: string;
  related?: TLink;
  decribedBy?: string;
  pagination?: TPaginationLinks;
};

export type TErrorLink = {
  about?: TLink;
  type?: TLink;
};
