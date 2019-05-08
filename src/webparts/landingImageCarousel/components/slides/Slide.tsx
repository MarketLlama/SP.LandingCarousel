import * as React from 'react';
import { ISlideProps } from '.';
import styles from './../LandingImageCarousel.module.scss';

export class Slide extends React.Component<ISlideProps, {}> {
  constructor(props: ISlideProps) {
    super(props);
  }
  public render() {
    const pictureURL = encodeURI(this.props.item.picture);
    const slideStyle: React.CSSProperties = {};
    slideStyle.backgroundImage = `linear-gradient(${this.props.defaultColor}, ${this.props.defaultColor}), url("${pictureURL}")`;

    const textStyle: React.CSSProperties = {};
    textStyle.color = this.props.textColor;

    return (
      <div>
        <a href={this.props.item.url ? this.props.item.url : null}
          target={this.props.item.target ? this.props.item.target : null}>
          <div className={styles.slideImage} style={slideStyle}>
            <div className={styles.slideText} style={textStyle} >
              <h1>{this.props.item.title}</h1>
              <p>{this.props.item.description}</p>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

