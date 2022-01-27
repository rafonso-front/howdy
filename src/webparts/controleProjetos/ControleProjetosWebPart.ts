import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'ControleProjetosWebPartStrings';
import ControleProjetos from './components/ControleProjetos';
import { IControleProjetosProps } from './components/IControleProjetosProps';



export interface IControleProjetosWebPartProps {
  description: string;
  typePicker: string;
  siteRelativeURL: string;

  principalTypeUser: boolean;
  principalTypeSharePointGroup: boolean;
  principalTypeSecurityGroup: boolean;
  principalTypeDistributionList: boolean;
  numberOfItems: number;
}

export default class ControleProjetosWebPart extends BaseClientSideWebPart<IControleProjetosWebPartProps> {

  public constructor(context?: IWebPartContext) {
    super();

    //Hack: to invoke correctly the onPropertyChange function outside this class
    //we need to bind this object on it first
    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
  }

  public render(): void {
    const element: React.ReactElement<IControleProjetosProps > = React.createElement(
      ControleProjetos,
      {
        pageUrl:this.context.pageContext.site.serverRequestPath.toLowerCase(),
        description: this.properties.description,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl + "/" + this.properties.siteRelativeURL,
        siteUrlPicker: this.context.pageContext.web.absoluteUrl,
        typePicker: this.properties.typePicker,
        principalTypeUser: this.properties.principalTypeUser,
        principalTypeSharePointGroup: this.properties.principalTypeSharePointGroup,
        principalTypeSecurityGroup: this.properties.principalTypeSecurityGroup,
        principalTypeDistributionList: this.properties.principalTypeDistributionList,
        numberOfItems: this.properties.numberOfItems
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "description"
          },
          groups: [
            {
              groupName: "BasicGroupName",
              groupFields: [
                PropertyPaneDropdown('typePicker', {
                  label: "TypePickerLabel",
                  selectedKey: "Normal",
                  options: [
                    { key: 'Normal', text: 'Normal' },
                    { key: 'Compact', text: 'Compact' }
                  ]
                }),
                PropertyPaneToggle('principalTypeUser', {
                    label: "principalTypeUserLabel",
                    checked: true,
                  }
                ),
                PropertyPaneToggle('principalTypeSharePointGroup', {
                    label: "principalTypeSharePointGroupLabel",
                    checked: true,
                  }
                ),
                PropertyPaneToggle('principalTypeSecurityGroup', {
                    label: "principalTypeSecurityGroupLabel",
                    checked: false,
                  }
                ),
                PropertyPaneToggle('principalTypeDistributionList', {
                    label: "principalTypeDistributionListLabel",
                    checked: false,
                  }
                ),
                PropertyPaneSlider('numberOfItems', {
                  label: "numberOfItemsFieldLabel",
                  min: 1,
                  max: 20,
                  step: 1
                }),
              ]
            },
            {  
              groupName: "General Settings",  
              groupFields: [  
                PropertyPaneTextField('siteRelativeURL',{  
                  label: 'Campo Opicional: Informe a URL relativa do site, onde estão as listas (Errado: https://uolinc.sharepoint.com/sites/SPDevelopersite/TecnologiaCorporativaDEV --> Certo:/TecnologiaCorporativaDEV/ )',
                }),  
              ]
            }
          ]
        }
      ]
    };
  }
}
