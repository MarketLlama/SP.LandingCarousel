import * as React from 'react';
import {ISlideProps} from '.';
import styles from './../LandingImageCarousel.module.scss';

export class Slide extends React.Component<ISlideProps, {}> {
  constructor(props: ISlideProps) {
    super(props);
  }
  public render() {
    const pictureURL = encodeURI(this.props.item.picture);
    const slideStyle: React.CSSProperties = {};
    slideStyle.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${pictureURL}")`;

    return (
      <div className={styles.slideImage} style={slideStyle}>
        <div className={styles.slideText}>
          <h1>{this.props.item.title}</h1>
          <p>{this.props.item.description}</p>
        </div>
      </div>
    );
  }
}

