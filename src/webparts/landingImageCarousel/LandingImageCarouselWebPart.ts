import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';

import * as strings from 'LandingImageCarouselWebPartStrings';
import LandingImageCarousel from './components/LandingImageCarousel';
import {ILandingImageCarouselProps, ISlideInfo, LinkTarget, SlideTypes } from './components';
//Slick styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export interface ILandingImageCarouselWebPartProps {
  collectionData: ISlideInfo[];
  tileHeight: number;
  title: string;
  defaultColor : string;
  textColor : string;
  descriptionTextColor : string;
  headerUnderline : boolean;
}

export default class LandingImageCarouselWebPart extends BaseClientSideWebPart<ILandingImageCarouselWebPartProps> {
  private propertyFieldCollectionData;
  private customCollectionFieldType;
  private propertyFieldColor;
  private propertyFieldColorStyle;

  public render(): void {
    const element: React.ReactElement<ILandingImageCarouselProps > = React.createElement(
      LandingImageCarousel,
      {
        title: this.properties.title,
        defaultColor : this.properties.defaultColor,
        textColor : this.properties.textColor,
        descriptionTextColor : this.properties.descriptionTextColor,
        headerUnderline: this.properties.headerUnderline,
        collectionData: this.properties.collectionData,
        displayMode: this.displayMode,
        fUpdateProperty: (value: string) => {
          this.properties.title = value;
        },
        fUpdateCollectionData : (value : string, item : ISlideInfo, prop : string) =>{
          this.properties.collectionData.forEach((colData, i ) =>{
            if (colData.uniqueId == item.uniqueId){
              this.properties.collectionData[i][prop] = value;
            }
          });
        },
        fPropertyPaneOpen: this.context.propertyPane.open
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected async loadPropertyPaneResources(): Promise<void> {
    // import additional controls/components

    const { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } = await import (
      /* webpackChunkName: 'pnp-propcontrols-number' */
      '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker'
    );
    const { PropertyFieldCollectionData, CustomCollectionFieldType } = await import (
      /* webpackChunkName: 'pnp-propcontrols-colldata' */
      '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData'
    );

    this.propertyFieldCollectionData = PropertyFieldCollectionData;
    this.customCollectionFieldType = CustomCollectionFieldType;
    this.propertyFieldColor = PropertyFieldColorPicker;
    this.propertyFieldColorStyle = PropertyFieldColorPickerStyle;
  }

  protected get disableReactivePropertyChanges(): boolean {
    return false;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                this.propertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: strings.tilesDataLabel,
                  panelHeader: strings.tilesPanelHeader,
                  panelDescription: `${strings.iconInformation}`,
                  manageBtnLabel: strings.tilesManageBtn,
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "title",
                      title: strings.titleField,
                      type: this.customCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "description",
                      title: strings.descriptionField,
                      type: this.customCollectionFieldType.string,
                      required: false
                    },
                    {
                      id: "url",
                      title: strings.urlField,
                      type: this.customCollectionFieldType.string,
                      required: false
                    },
                    {
                      id: "picture",
                      title: strings.pictureField,
                      type: this.customCollectionFieldType.url,
                      required: false
                    },
                    {
                      id: "target",
                      title: strings.targetField,
                      type: this.customCollectionFieldType.dropdown,
                      options: [
                        {
                          key: LinkTarget.parent,
                          text: strings.targetCurrent
                        },
                        {
                          key: LinkTarget.blank,
                          text: strings.targetNew
                        }
                      ]
                    },{
                      id: "slideType",
                      title: 'Slide Type',
                      selectedKey: SlideTypes.MIDDLE_TEXT,
                      type: this.customCollectionFieldType.dropdown,
                      options: [
                        {
                          key: SlideTypes.MIDDLE_TEXT,
                          text: 'Middle Text Slide'
                        },
                        {
                          key: SlideTypes.LEFT_PANNEL,
                          text: 'Left Pannel Slide'
                        },
                        {
                          key: SlideTypes.RIGHT_PANNEL,
                          text: 'Right Pannel Slide'
                        }
                      ]
                    }
                  ]
                }),
                this.propertyFieldColor(
                  'defaultColor', {
                    label: 'Background Color',
                    selectedColor: this.properties.defaultColor,
                    properties: this.properties,
                    disabled: false,
                    isHidden: false,
                    alphaSliderHidden: false,
                    style: this.propertyFieldColorStyle.Full,
                    iconName: 'Precipitation',
                    key: 'colorFieldId',
                    onPropertyChange: this.onPropertyPaneFieldChanged
                }),
                PropertyPaneDropdown('textColor',{
                  label : 'Heading Color',
                  selectedKey : '#FFF',
                  options:[{
                    key: "#FFF",
                    text: "White"
                  },
                  {
                    key: "#000",
                    text: "Black"
                  },
                  {
                    key: '#3F3F3F',
                    text : 'Grey'
                  },
                  {
                    key: '#5F7800',
                    text : 'Dark Green'
                  },
                  {
                    key: '#aab400',
                    text : 'Light Green'
                  }]
                }),
                PropertyPaneDropdown('descriptionTextColor',{
                  label : 'Heading Color',
                  selectedKey : '#FFF',
                  options:[{
                    key: "#FFF",
                    text: "White"
                  },
                  {
                    key: "#000",
                    text: "Black"
                  },
                  {
                    key: '#3F3F3F',
                    text : 'Grey'
                  },
                  {
                    key: '#5F7800',
                    text : 'Dark Green'
                  },
                  {
                    key: '#aab400',
                    text : 'Light Green'
                  }]
                }),
                PropertyPaneToggle("headerUnderline", {
                  label: 'Underline Header',
                  checked: false
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
