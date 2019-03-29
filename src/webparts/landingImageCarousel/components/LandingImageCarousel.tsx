import * as React from 'react';
import ReactSwipe from 'react-swipe';
import styles from './LandingImageCarousel.module.scss';
import { ILandingImageCarouselProps } from './ILandingImageCarouselProps';
import { Slide } from './slides';
export default class LandingImageCarousel extends React.Component<ILandingImageCarouselProps, {}> {

  private reactSwipeEl: any;
  private swipeOptions = {
    startSlide: 1,
    speed: 400,
    widthOfSiblingSlidePreview: 0,
    auto: 3000,
    continuous: true,
    disableScroll: false,
    stopPropagation: false,
    callback: (index, elem) =>{},
    transitionEnd: (index, elem) => {}
  };

  public render(): React.ReactElement<ILandingImageCarouselProps> {

    return (
      <div className={ styles.landingImageCarousel }>
        <ReactSwipe
          className={styles.carousel}
          swipeOptions={this.swipeOptions}
          ref={el => (this.reactSwipeEl = el)}
        >
          {this.props.collectionData.map((slide, idx) => <Slide item={slide} key={idx}/>)}
        </ReactSwipe>
        <button onClick={() => this.reactSwipeEl.next()}>Next</button>
        <button onClick={() => this.reactSwipeEl.prev()}>Previous</button>
      </div>
    );
  }
}
