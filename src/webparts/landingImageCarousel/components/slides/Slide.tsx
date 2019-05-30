import * as React from 'react';
import { ISlideProps } from '.';
import { SlideTypes } from '..';
import styles from './../LandingImageCarousel.module.scss';
import { DisplayMode } from '@microsoft/sp-core-library';

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
    switch (this.props.item.slideType) {
      case SlideTypes.LEFT_PANNEL:
        slideStyle.backgroundImage = `url("${pictureURL}")`;
        textStyle.backgroundColor = this.props.defaultColor;
        return (
          <div>
            <a href={this.props.item.url && (this.props.displayMode == DisplayMode.Read) ? this.props.item.url : null}
              target={this.props.item.target ? this.props.item.target : null}>
              <div className={styles.slideImage} style={slideStyle}>
                <div className={styles.slideTextLeft} style={textStyle} >
                  {
                    this.props.displayMode === DisplayMode.Edit && (
                      <p className={styles.title} >
                        <textarea placeholder={this.props.item.title}
                          onChange={this._onChangeTitle}
                          defaultValue={this.props.item.title} />
                      </p>
                    )
                  }
                  {
                    this.props.displayMode !== DisplayMode.Edit && this.props.item.title &&
                    <p className={styles.title} >{this.props.item.title}</p>
                  }
                  {
                    this.props.displayMode === DisplayMode.Edit && (
                      <p className={styles.description} >
                        <textarea placeholder={this.props.item.description}
                          onChange={this._onChangeDescription}
                          defaultValue={this.props.item.description} />
                      </p>
                    )
                  }
                  {
                    this.props.displayMode !== DisplayMode.Edit && this.props.item.description &&
                    <p className={styles.description}>{this.props.item.description}</p>
                  }
                </div>
              </div>
            </a>
          </div>
        );
      case SlideTypes.RIGHT_PANNEL:
        slideStyle.backgroundImage = `url("${pictureURL}")`;
        textStyle.backgroundColor = this.props.defaultColor;
        return (
          <div>
            <a href={this.props.item.url && (this.props.displayMode == DisplayMode.Read) ? this.props.item.url : null}
              target={this.props.item.target ? this.props.item.target : null}>
              <div className={styles.slideImage} style={slideStyle}>
                <div className={styles.slideTextRight} style={textStyle} >
                  {
                    this.props.displayMode === DisplayMode.Edit && (
                      <p className={styles.title} >
                        <textarea placeholder={this.props.item.title}
                          onChange={this._onChangeTitle}
                          defaultValue={this.props.item.title} />
                      </p>
                    )
                  }
                  {
                    this.props.displayMode !== DisplayMode.Edit && this.props.item.title &&
                    <p className={styles.title} >{this.props.item.title}</p>
                  }
                  {
                    this.props.displayMode === DisplayMode.Edit && (
                      <p className={styles.description} >
                        <textarea placeholder={this.props.item.description}
                          onChange={this._onChangeDescription}
                          defaultValue={this.props.item.description} />
                      </p>
                    )
                  }
                  {
                    this.props.displayMode !== DisplayMode.Edit && this.props.item.description &&
                    <p className={styles.description}>{this.props.item.description}</p>
                  }
                </div>
              </div>
            </a>
          </div>
        );
      default:
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
  private _onChangeTitle = (event) => {
    this.props.fUpdateProperty(event.target.value, this.props.item);
  }

  private _onChangeDescription = (event) => {
    this.props.fUpdateProperty(event.target.value, this.props.item);
  }

}

