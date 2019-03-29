import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';

import * as strings from 'LandingImageCarouselWebPartStrings';
import LandingImageCarousel from './components/LandingImageCarousel';
import {ILandingImageCarouselProps, ISlideInfo, LinkTarget } from './components';

export interface ILandingImageCarouselWebPartProps {
  collectionData: ISlideInfo[];
  tileHeight: number;
  title: string;
  defaultColor : string;
  textColor : string;
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
        collectionData: this.properties.collectionData,
        displayMode: this.displayMode,
        fUpdateProperty: (value: string) => {
          this.properties.title = value;
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

  private _setDeafultColor = (color) =>{
    console.log(color);
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
                      required: true
                    },
                    {
                      id: "picture",
                      title: strings.pictureField,
                      type: this.customCollectionFieldType.url,
                      required: true
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
                    }
                  ]
                }),
                this.propertyFieldColor(
                  'defaultColor', {
                    label: 'Default Color',
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
                  label : 'Text Color',
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
                  }]
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
