import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import {getTrackHistoryByID} from '../../services';


class historicoversao extends React.Component <any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
            demandaId:this.props.demandaid,
            paineltrack:true,
            urlIframe:this.props.siteUrl+"/_layouts/15/Versions.aspx?list={27CDCEB4-2DCF-4412-A56C-982E6C3E9E48%7D&ID="+this.props.demandaid+"&IsDlg=1"
        }
    }
    componentDidMount() {
debugger
this.props.siteUrl
    }
    private _openTrackStatus =(id):void=>{
        getTrackHistoryByID(id,this.props.siteUrl).then(data => {
            
            this.setState({trackItens:data})
        });

        this.setState({paineltrack:true})
    }
    private _closePanel =():void=>{
            this.props._hidepanel();
        // this.setState({paineltrack:false})
    }
    private _onParseDateFromString = (value: string): string => {
        const values = value.trim().split('T')[0].split('-');
        return values[2]+"/"+values[1]+"/"+values[0];
    };
    render () { 
        return (
            <div className="history btn-action-card" onClick={() => this._openTrackStatus(this.state.demandaId)}>

                {this.state.paineltrack?
                    <div className="inner-card">
                        <Panel
                            isOpen={true}
                            onDismiss={this._closePanel}
                            type={PanelType.medium}
                            isFooterAtBottom={true}
                        >   
                            <div className="frameHist itens-track">
                                <div className="demanda-nome">
                                    {this.props.name}
                                </div>
                                <iframe frameBorder="0" src={this.state.urlIframe}></iframe>   
                            </div> 
                            </Panel>
                        </div>
                    :
                        ""
                }
            </div> 
        )
    }
}
export default historicoversao;