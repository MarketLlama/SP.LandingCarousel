import { ISlideInfo } from '..';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface ISlideProps {
  item: ISlideInfo;
  defaultColor : string;
  textColor : string;
  headerUnderline: boolean;
  descriptionTextColor : string;
  displayMode : DisplayMode;
  fUpdateProperty: Function;
}
