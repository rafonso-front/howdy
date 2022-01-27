import { SPHttpClient } from '@microsoft/sp-http';
import { SharePointUserPersona } from '../../models/OfficeUiFabricPeoplePicker';

export interface IOfficeUiFabricPeoplePickerProps {
  description: string;
  spHttpClient: SPHttpClient;
  siteUrlPicker: string;
  typePicker: string;
  principalTypeUser: boolean;
  principalTypeSharePointGroup: boolean;
  principalTypeSecurityGroup: boolean;
  principalTypeDistributionList: boolean;
  numberOfItems: number;
  _getidUser?: () => void;
  _verificaForm?: () => void;
  onChange?: (items: SharePointUserPersona[]) => void;
}
