import { DisplayMode } from "@microsoft/sp-core-library";
import { ISlideInfo } from "./ISlideInfo";

export interface ILandingImageCarouselProps {
  title : string;
  displayMode: DisplayMode;
  collectionData : ISlideInfo[];
  fUpdateProperty: (value: string) => void;
  fPropertyPaneOpen: () => void;
}
