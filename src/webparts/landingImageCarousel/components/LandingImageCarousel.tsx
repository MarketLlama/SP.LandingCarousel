import * as React from 'react';
import ReactSwipe from 'react-swipe';
import styles from './LandingImageCarousel.module.scss';
import { ILandingImageCarouselProps } from './ILandingImageCarouselProps';
import { Slide } from './slides';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class LandingImageCarousel extends React.Component<ILandingImageCarouselProps, {}> {

  private reactSwipeEl: any;
  private swipeOptions = {
    startSlide: 0,
    speed: 400,
    auto: 3000,
    continuous: true,
    disableScroll: true,
    stopPropagation: false
  };


  public render(): React.ReactElement<ILandingImageCarouselProps> {
    const webpartStyle: React.CSSProperties = {};
    webpartStyle.backgroundColor = this.props.defaultColor;
    return (
      <div className={ styles.landingImageCarousel } style={webpartStyle}>
        <ReactSwipe
          className={styles.carousel}
          swipeOptions={this.swipeOptions}
          ref={el => (this.reactSwipeEl = el)}
        >
          {this.props.collectionData?
              this.props.collectionData.map((slide, idx) => <Slide item={slide} key={idx}
                defaultColor={this.props.defaultColor} textColor={this.props.textColor} />) : null}
        </ReactSwipe>
        <a className={styles.next} onClick={() => this.reactSwipeEl.next()}>
          <Icon iconName="DoubleChevronLeftMedMirrored"/>
        </a>
        <a className={styles.prev} onClick={() => this.reactSwipeEl.prev()}>
          <Icon iconName="DoubleChevronLeftMed"/>
        </a>
      </div>
    );
  }
}
