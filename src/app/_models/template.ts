export interface Template {
  children: File[];
  id: string;
  img: string;
  kind: string;
  mimeType: string;
  refLink: string;
  name: string;
  tags: string[];
}

export interface File {
  id: string;
  kind: string;
  mimeType: string;
  name: string;
}
