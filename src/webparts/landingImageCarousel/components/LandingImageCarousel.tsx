import * as React from 'react';
import styles from './LandingImageCarousel.module.scss';
import { ILandingImageCarouselProps } from './ILandingImageCarouselProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class LandingImageCarousel extends React.Component<ILandingImageCarouselProps, {}> {
  public render(): React.ReactElement<ILandingImageCarouselProps> {
    return (
      <div className={ styles.landingImageCarousel }>

      </div>
    );
  }
}
