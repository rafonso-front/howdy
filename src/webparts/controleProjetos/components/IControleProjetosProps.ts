import { SharePointUserPersona } from "../models/OfficeUiFabricPeoplePicker";
import { SPHttpClient } from "@microsoft/sp-http";

export interface IControleProjetosProps {
  pageUrl:string;
  description: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  siteUrlPicker: string;
  typePicker: string;
  principalTypeUser: boolean;
  principalTypeSharePointGroup: boolean;
  principalTypeSecurityGroup: boolean;
  principalTypeDistributionList: boolean;
  numberOfItems: number;
  onChange?: (items: SharePointUserPersona[]) => void;


}
