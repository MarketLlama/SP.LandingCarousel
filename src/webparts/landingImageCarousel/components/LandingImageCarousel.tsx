import * as React from 'react';
import Slider from "react-slick";
import styles from './LandingImageCarousel.module.scss';
import { ILandingImageCarouselProps } from './ILandingImageCarouselProps';
import { Slide } from './slides';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class LandingImageCarousel extends React.Component<ILandingImageCarouselProps, {}> {
  private slider : any;
  public render(): React.ReactElement<ILandingImageCarouselProps> {
    const settings = {
      dots: false,
      infinite: true,
      autoplay : true,
      autoplaySpeed : 5000,
      speed: 500,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const webpartStyle: React.CSSProperties = {};
    webpartStyle.backgroundColor = this.props.defaultColor;
    return (
      <div className={ styles.landingImageCarousel } style={webpartStyle}>
        <Slider ref={slider => (this.slider = slider)}
          {...settings}
        >
          {this.props.collectionData?
              this.props.collectionData.map((slide, idx) => <Slide item={slide} key={idx}
                defaultColor={this.props.defaultColor}
                textColor={this.props.textColor}
                displayMode={this.props.displayMode}
                fUpdateProperty={this._updateProperty}
              />) : null}
        </Slider>
        <a className={styles.next} onClick={() => this.slider.slickNext()}>
          <Icon iconName="DoubleChevronLeftMedMirrored"/>
        </a>
        <a className={styles.prev} onClick={() => this.slider.slickPrev()}>
          <Icon iconName="DoubleChevronLeftMed"/>
        </a>
      </div>
    );
  }

  private _updateProperty = (value, prop) =>{
    console.log(value);
    console.log(prop);
  }
}
