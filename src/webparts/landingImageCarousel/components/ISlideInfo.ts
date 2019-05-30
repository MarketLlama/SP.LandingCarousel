export interface ISlideInfo {
  title: string;
  description: string;
  url: string;
  icon: string;
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
