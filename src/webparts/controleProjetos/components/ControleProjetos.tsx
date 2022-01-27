import * as React from 'react';
import { IControleProjetosProps } from './IControleProjetosProps';
import EnvolveComponents from "./envolveComponents/envolveComponents"
import './globalcss.css';

export default class ControleProjetos extends React.Component<IControleProjetosProps, {}> {
	public render(): React.ReactElement<IControleProjetosProps> {
		return (
			<div>
				<EnvolveComponents
					pageUrl={this.props.pageUrl}
					urlSite={this.props.siteUrl}
					siteUrl={this.props.siteUrl}
					siteUrlPicker={this.props.siteUrlPicker}
					spHttpClient={this.props.spHttpClient}
				/>
			</div>
		);
	}
}

