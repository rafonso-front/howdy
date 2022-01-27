import * as React from 'react';
import { BaseComponent, assign, autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IPersonaProps, Persona } from 'office-ui-fabric-react/lib/Persona';
import {
    CompactPeoplePicker,
    IBasePickerSuggestionsProps,
    IBasePicker,
    ListPeoplePicker,
    NormalPeoplePicker,
    ValidationState
} from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.types';
import { people } from './PeoplePickerExampleData';
import { Promise } from 'es6-promise';
import * as lodash from 'lodash';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import {
    SPHttpClient,
    SPHttpClientBatch,
    SPHttpClientResponse
} from '@microsoft/sp-http';
import {
    Environment,
    EnvironmentType
} from '@microsoft/sp-core-library';
import {
    IClientPeoplePickerSearchUser,
    IEnsurableSharePointUser,
    IEnsureUser,
    IOfficeUiFabricPeoplePickerState,
    SharePointUserPersona } from '../../models/OfficeUiFabricPeoplePicker';

import axios from 'axios';

export interface IOfficeUiFabricPeoplePickerProps {
spHttpClient: SPHttpClient;
siteUrl: string;
siteUrlPicker: string;
typePicker: string;
principalTypeUser: boolean;
principalTypeSharePointGroup: boolean;
principalTypeSecurityGroup: boolean;
principalTypeDistributionList: boolean;
numberOfItems: number;
selecionado?: string;
selecionados?: IPersonaProps[];
_getidUser?: any;
_verificaForm?: any;
itemLimit:number

onChange?: (items: SharePointUserPersona[]) => void;
}

const suggestionProps: IBasePickerSuggestionsProps = {
    suggestionsHeaderText: 'Suggested People',
    mostRecentlyUsedHeaderText: 'Suggested Contacts',
    noResultsFoundText: 'No results found',
    loadingText: 'Loading',
    showRemoveButtons: true,
    suggestionsAvailableAlertText: 'People Picker Suggestions available',
    suggestionsContainerAriaLabel: 'Suggested contacts'
};

const limitedSearchAdditionalProps: IBasePickerSuggestionsProps = {
    searchForMoreText: 'Load all Results',
    resultsMaximumNumber: 10,
    searchingText: 'Searching...'
};

const limitedSearchSuggestionProps: IBasePickerSuggestionsProps = assign(limitedSearchAdditionalProps, suggestionProps);


class Usuarios extends React.Component <IOfficeUiFabricPeoplePickerProps, any> {
    private _peopleList;
    constructor(props: {}) {
        super();
        const peopleList: IPersonaWithMenu[] = [];
        this._peopleList = [];
        
        people.forEach((persona: IPersonaProps) => {
            const target: IPersonaWithMenu = {};
            assign(target, persona);
            this._peopleList.push(target);
        });

        this.state = {
            currentPicker: 1,
            delayResults: false,
            selectedItems: [],
        };
    }

   
    render() {
        return (
            <div>
                {
                    this.props.selecionado ? 
                    <div>
                        {this.props.itemLimit > 1?
                            <NormalPeoplePicker
                                onChange={this._onChange.bind(this)}
                                onResolveSuggestions={this._onFilterChanged}
                                getTextFromItem={(persona: IPersonaProps) => persona.primaryText}
                                pickerSuggestionsProps={suggestionProps}
                                className={'ms-PeoplePicker'}
                                key={'normal'}  
                                itemLimit={this.props.itemLimit} 
                                defaultSelectedItems={this.props.selecionados}
                                //onBlur={(itens) => this._onChange(itens)}
                            />                            
                            :
                            <NormalPeoplePicker
                                onChange={this._onChange.bind(this)}
                                onResolveSuggestions={this._onFilterChanged}
                                getTextFromItem={(persona: IPersonaProps) => persona.primaryText}
                                pickerSuggestionsProps={suggestionProps}
                                className={'ms-PeoplePicker'}
                                key={'normal'}  
                                itemLimit={this.props.itemLimit} 
                                defaultSelectedItems={[{text: this.props.selecionado}]}
                                //onBlur={() => this.props._onChange()}
                            />                        
                        }

                    </div>
                    :
                    <NormalPeoplePicker
                        onChange={this._onChange.bind(this)}
                        onResolveSuggestions={this._onFilterChanged}
                        getTextFromItem={(persona: IPersonaProps) => persona.primaryText}
                        pickerSuggestionsProps={suggestionProps}
                        className={'ms-PeoplePicker'}
                        key={'normal'}  
                        itemLimit={this.props.itemLimit} 
                        //onBlur={ () => this.props._verificaForm() }
                    />
                }
            </div>
        );
    }
    private _onChange(items: any[]) {
        
        this.setState({
            selectedItems: items
        });
        if (this.props.onChange) {
            this.props.onChange(items);
        }
        setTimeout(() => this.props._getidUser(this.state.selectedItems), 200);
    }
    @autobind
    private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) {
        if (filterText) {
            if (filterText.length > 2) {
                return this._searchPeople(filterText, this._peopleList);
            }
        } else {
            return [];
        }
    }

    private searchPeopleFromMock(): IPersonaProps[] {
        return this._peopleList = [
            {
                imageUrl: './images/persona-female.png',
                imageInitials: 'PV',
                primaryText: 'Annie Lindqvist',
                secondaryText: 'Designer',
                tertiaryText: 'In a meeting',
                optionalText: 'Available at 4:00pm'
            },
            {
                imageUrl: './images/persona-male.png',
                imageInitials: 'AR',
                primaryText: 'Aaron Reid',
                secondaryText: 'Designer',
                tertiaryText: 'In a meeting',
                optionalText: 'Available at 4:00pm'
            },
            {
                imageUrl: './images/persona-male.png',
                imageInitials: 'AL',
                primaryText: 'Alex Lundberg',
                secondaryText: 'Software Developer',
                tertiaryText: 'In a meeting',
                optionalText: 'Available at 4:00pm'
            },
            {
                imageUrl: './images/persona-male.png',
                imageInitials: 'RK',
                primaryText: 'Roko Kolar',
                secondaryText: 'Financial Analyst',
                tertiaryText: 'In a meeting',
                optionalText: 'Available at 4:00pm'
            },
        ];
    }

    /**
   * @function
   * Returns people results after a REST API call
   */
    private _searchPeople(terms: string, results: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {

        if (DEBUG && Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return this.searchPeopleFromMock();
        } else {
            const userRequestUrl: string = this.props.siteUrlPicker+"/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser";
            
            let principalType: number = 0;
            if (this.props.principalTypeUser === true) {
                principalType += 1;
            }
            if (this.props.principalTypeSharePointGroup === true) {
                principalType += 8;
            }
            if (this.props.principalTypeSecurityGroup === true) {
                principalType += 4;
            }
            if (this.props.principalTypeDistributionList === true) {
                principalType += 2;
            }
            const userQueryParams = {
                'queryParams': {
                    'AllowEmailAddresses': true,
                    'AllowMultipleEntities': false,
                    'AllUrlZones': false,
                    'MaximumEntitySuggestions': this.props.numberOfItems,
                    'PrincipalSource': 15,
                    // PrincipalType controls the type of entities that are returned in the results.
                    // Choices are All - 15, Distribution List - 2 , Security Groups - 4, SharePoint Groups - 8, User - 1.
                    // These values can be combined (example: 13 is security + SP groups + users)
                    'PrincipalType': principalType,
                    'QueryString': terms
                }
            };


            const spHClient = this.props.spHttpClient;
            return new Promise<SharePointUserPersona[]>((resolve, reject) =>
                this.props.spHttpClient.post(userRequestUrl,
                    SPHttpClient.configurations.v1, {  body: JSON.stringify(userQueryParams) })
                    .then((response: SPHttpClientResponse) => {
                        
                        return response.json();
                    })
                    .then((response: { value: string }) => {
                        
                        let userQueryResults: IClientPeoplePickerSearchUser[] = JSON.parse(response.value);
                        let persons = userQueryResults.map(p => new SharePointUserPersona(p as IEnsurableSharePointUser));
                        return persons;
                    })
                    .then((persons) => {
                        
                        const batch = this.props.spHttpClient.beginBatch();
                        const ensureUserUrl = `${this.props.siteUrlPicker}/_api/web/ensureUser`;
                        const batchPromises: Promise<IEnsureUser>[] = persons.map(p => {
                            var userQuery = JSON.stringify({ logonName: p.User.Key });
                            return batch.post(ensureUserUrl, SPHttpClientBatch.configurations.v1, {
                                body: userQuery
                            })
                                .then((response: SPHttpClientResponse) => response.json())
                                .then((json: IEnsureUser) => json);
                        });

                        var users = batch.execute().then(() => Promise.all(batchPromises).then(values => {
                            values.forEach(v => {
                                let userPersona = lodash.find(persons, o => o.User.Key == v.LoginName);
                                if (userPersona && userPersona.User) {
                                    let user = userPersona.User;
                                    lodash.assign(user, v);
                                    userPersona.User = user;
                                }
                            });

                            resolve(persons);
                        }));
                    }, (error: any): void => {
                        
                        reject(this._peopleList = []);
                        console.log(error);
                    }));
        }
    }

   



}

export default Usuarios;