export interface ISlideInfo {
  uniqueId : string;
  title: string;
  description: string;
  url: string;
  picture : string;
  target: LinkTarget;
  slideType : SlideTypes;
}

export enum LinkTarget {
  parent = "",
  blank = "_blank"
}

export enum SlideTypes {
  MIDDLE_TEXT,
  LEFT_PANNEL,
  RIGHT_PANNEL
}
