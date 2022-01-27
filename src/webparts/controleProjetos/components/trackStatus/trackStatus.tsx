import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import {getTrackHistoryByID} from '../../services';
import  './trackStatus.css';

class trackStatus extends React.Component <any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
            demandaId:this.props.demandaid,
            paineltrack:true,
            trackItens:[],
        };
    }
    componentDidMount() {
        this._openTrackStatus(this.props.demandaid);
    }
    private _hidepanel = ():void=>{
        this.props._hidepanel();
    }
    private _openTrackStatus =(id):void=>{
        getTrackHistoryByID(id,this.props.siteUrl).then(data => {
            this.setState({trackItens:data});
        });
        this.setState({paineltrack:true});
    }
    private _closePanel =():void=>{
        this._hidepanel();
    }
    private _onParseDateFromString = (value: string): string => {
        debugger
        const values = value.trim().split('T')[0].split('-');
        return values[2]+"/"+values[1]+"/"+values[0] +" " + value.trim().split('T')[1].replace("Z","");
    };
    render () { 
        return (
            <div className="trackstatus btn-action-card" onClick={() => this._openTrackStatus(this.state.demandaId)}>
                {this.state.paineltrack?
                    <div className="inner-card">
                        <Panel
                            isOpen={true}
                            onDismiss={this._closePanel}
                            type={PanelType.medium}
                            isFooterAtBottom={true}
                        >
                                <div className="itens-track">
                                    <div className="demanda-nome">
                                        {this.props.name}
                                    </div>
                                    
                                {this.state.trackItens.length>0 ? 
                                    <div>
                                    <div className="row-track th">
                                        <div className="">
                                            Status Anterior
                                        </div>                                      
                                        <div className="">
                                            Novo Status                                            
                                        </div>
                                        <div className="">
                                            Data
                                        </div>                                            
                                        <div className="">
                                            Usuário
                                        </div>
                                    </div>                                
                                    {this.state.trackItens.map((projeto) =>
                                        <div className="row-track">
                                            <div className="">
                                                {projeto.StatusAntigo.Title}  
                                            </div>                                      
                                            <div className="">
                                                {projeto.Status.Title}  
                                                
                                            </div>
                                            
                                            <div className="datatrack">
                                                {this._onParseDateFromString(projeto.Created)}  
                                            </div>                                            
                                            <div className="">
                                                {projeto.Author.Title}  
                                            </div>
                                        </div>
                                    )
                                }
                                </div>
                            :
                            <div>
                                <div className="row-track th">
                                    <div className="">
                                        Status Anterior
                                    </div>                                      
                                    <div className="">
                                        Novo Status                                            
                                    </div>
                                    <div className="">
                                        Data
                                    </div>                                            
                                    <div className="">
                                        Usuário
                                    </div>
                                </div>  
                                <div className="row-track zeroitens">
                                    Não encontramos itens.
                                    
                                </div>
                            </div>                          
                            }   
                            </div>   
                            </Panel>
                        </div>
                    :
                        ""
                }
            </div> 
        );
    }
}
export default trackStatus;