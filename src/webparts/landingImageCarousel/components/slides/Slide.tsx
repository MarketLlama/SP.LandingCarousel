import * as React from 'react';
import { ISlideProps } from '.';
import { SlideTypes } from '..';
import Textarea from 'react-expanding-textarea';
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
    textStyle.textDecoration = this.props.headerUnderline? 'underline' : 'none';

    const desciptionStyle : React.CSSProperties = {};
    desciptionStyle.color = this.props.descriptionTextColor;

    const backStyle : React.CSSProperties = {};

    switch (this.props.item.slideType) {
      case SlideTypes.LEFT_PANNEL:
        slideStyle.backgroundImage = `url("${pictureURL}")`;
        backStyle.backgroundColor = this.props.defaultColor;
        return (
          <div>
            <a href={this.props.item.url && (this.props.displayMode == DisplayMode.Read) ? this.props.item.url : null}
              target={this.props.item.target ? this.props.item.target : null}>
              <div className={styles.slideImage} style={slideStyle}>
                <div className={styles.slideTextLeft} style={backStyle}>
                  {
                    this.props.displayMode === DisplayMode.Edit && (
                      <p className={styles.title} style={textStyle}>
                        <Textarea placeholder={this.props.item.title}
                          onChange={this._onChangeTitle}
                          defaultValue={this.props.item.title} />
                      </p>
                    )
                  }
                  {
                    this.props.displayMode !== DisplayMode.Edit && this.props.item.title &&
                    <p className={styles.title} style={textStyle}>{this.props.item.title}</p>
                  }
                  {
                    this.props.displayMode === DisplayMode.Edit && (
                      <p className={styles.description} style={desciptionStyle}>
                        <Textarea placeholder={this.props.item.description}
                          onChange={this._onChangeDescription}
                          defaultValue={this.props.item.description} />
                      </p>
                    )
                  }
                  {
                    this.props.displayMode !== DisplayMode.Edit && this.props.item.description &&
                    <p className={styles.description} style={desciptionStyle}>{this.props.item.description}</p>
                  }
                </div>
              </div>
            </a>
          </div>
        );
      case SlideTypes.RIGHT_PANNEL:
        slideStyle.backgroundImage = `url("${pictureURL}")`;
        backStyle.backgroundColor = this.props.defaultColor;
        return (
          <div>
            <a href={this.props.item.url && (this.props.displayMode == DisplayMode.Read) ? this.props.item.url : null}
              target={this.props.item.target ? this.props.item.target : null}>
              <div className={styles.slideImage} style={slideStyle}>
                <div className={styles.slideTextRight} style={backStyle} >
                  {
                    this.props.displayMode === DisplayMode.Edit && (
                      <p className={styles.title} style={textStyle}>
                        <Textarea placeholder={this.props.item.title}
                          onChange={this._onChangeTitle}
                          defaultValue={this.props.item.title} />
                      </p>
                    )
                  }
                  {
                    this.props.displayMode !== DisplayMode.Edit && this.props.item.title &&
                    <p className={styles.title} style={textStyle}>{this.props.item.title}</p>
                  }
                  {
                    this.props.displayMode === DisplayMode.Edit && (
                      <p className={styles.description} style={desciptionStyle}>
                        <Textarea placeholder={this.props.item.description}
                          onChange={this._onChangeDescription}
                          defaultValue={this.props.item.description} />
                      </p>
                    )
                  }
                  {
                    this.props.displayMode !== DisplayMode.Edit && this.props.item.description &&
                    <p className={styles.description} style={desciptionStyle}>{this.props.item.description}</p>
                  }
                </div>
              </div>
            </a>
          </div>
        );
      default:
        return (
          <div>
            <a href={this.props.item.url && (this.props.displayMode == DisplayMode.Read) ? this.props.item.url : null}
              target={this.props.item.target ? this.props.item.target : null}>
              <div className={styles.slideImage} style={slideStyle}>
                <div className={styles.slideText} style={textStyle} >
                  {
                    this.props.displayMode === DisplayMode.Edit && (
                      <p className={styles.title} >
                        <Textarea placeholder={this.props.item.title}
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
                      <p className={styles.description} style={desciptionStyle}>
                        <Textarea placeholder={this.props.item.description}
                          onChange={this._onChangeDescription}
                          defaultValue={this.props.item.description} />
                      </p>
                    )
                  }
                  {
                    this.props.displayMode !== DisplayMode.Edit && this.props.item.description &&
                    <p className={styles.description} style={desciptionStyle}>{this.props.item.description}</p>
                  }
                </div>
              </div>
            </a>
          </div>
        );
    }
  }
  private _onChangeTitle = (event) => {
    this.props.fUpdateProperty(event.target.value, this.props.item, 'title');
  }

  private _onChangeDescription = (event) => {
    this.props.fUpdateProperty(event.target.value, this.props.item, 'description');
  }

}

