import { DisplayMode } from "@microsoft/sp-core-library";
import { ISlideInfo } from "./ISlideInfo";

export interface ILandingImageCarouselProps {
  title : string;
  defaultColor : string;
  textColor : string;
  descriptionTextColor : string;
  headerUnderline : boolean;
  displayMode: DisplayMode;
  collectionData : ISlideInfo[];
  fUpdateProperty: (value: string) => void;
  fUpdateCollectionData: (value : string, item : ISlideInfo, prop : string) => void;
  fPropertyPaneOpen: () => void;
}
