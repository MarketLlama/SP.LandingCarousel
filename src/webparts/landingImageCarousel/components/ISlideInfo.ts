export interface ISlideInfo {
  title: string;
  description: string;
  url: string;
  icon: string;
  picture : string;
  target: LinkTarget;
}

export enum LinkTarget {
  parent = "",
  blank = "_blank"
}
