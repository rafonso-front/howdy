import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

import * as React from 'react';
import {
    getProjetos,
    postProjeto,
    getToken,
    getMyTeamsGestor,
} from '../../services';

class Projeto extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
          this.state = {
              editMode:false,
              projetos:[],
              exibeBtnEdit:false,
              times:[],
              error:false,
              sucesso:false,
        }
    }
    private _closePanel = (): void => {
        this.props._closePanel ? this.props._closePanel() : null;
    }
    private _salvaProjeto = (): void => {
        debugger
        if(this.state.novoProjeto != "" && this.state.novoProjeto != null && this.state.TimeId != ""&& this.state.TimeId != null){
            this.setState({TimeName:""});

            let dadosForm = {
                Title:this.state.novoProjeto,
                TimeId:this.state.TimeId.Id
            }
            getToken(this.props.siteUrl).then(token => {
                postProjeto(this.props.siteUrl, dadosForm, this.state.itemID,token).then(retorno =>{
                    getProjetos(this.props.siteUrl,"Projeto","Title",this.state.times).then(retorno =>{
                        this.setState({projetos:retorno,editMode:false});
                        this.setState({sucesso: true}, () => setTimeout(() => this.setState({ sucesso: false}), 5000));
                    })             
                })  
            })
        }
        else{
            this.setState({error: true}, () => setTimeout(() => this.setState({ error: false}), 5000));
        }
    }
    private Cancela = (): void => {
        this.setState({TimeName:""});

        getProjetos(this.props.siteUrl,"Projeto","Title",this.state.times).then(retorno =>{
            this.setState({projetos:retorno,editMode:false});
        })   
    }
    componentDidMount() {
        debugger
        getMyTeamsGestor(this.props.siteUrl).then(meustimes =>{
            this.setState({times:meustimes});
            
            getProjetos(this.props.siteUrl,"Projeto","Title",meustimes).then(retorno =>{
                this.setState({projetos:retorno});
            })   
        })    
    }

    private _onRenderFooterContent = (): JSX.Element => {
        return (
            <div>   

                {this.state.sucesso?
                    <MessageBar messageBarType={MessageBarType.success}>Salvo com sucesso!</MessageBar>
                :
                ""
                }

                {this.state.error?
                    <MessageBar messageBarType={MessageBarType.error}>Preencha todos os campos.</MessageBar>
                :
                    ""
                }                
                <DefaultButton disabled={this.state.editMode}  onClick={this._closePanel} style={{ marginRight: '8px' }}>Fechar</DefaultButton>
            </div>
        );
    };
    private _changeProjeto = (comboValue):void => {
        this.setState({TimeId:comboValue.TimeId,exibeBtnEdit:true});
        this.setState({TimeName:comboValue.TimeName});
        
        this.setState({itemID:comboValue.Id,novoProjeto:comboValue.Title});
    }
    private edit = ():void=>{
        this.setState({editMode:true});
    }
    private create = ():void=>{
        this.setState({editMode:true,itemID:0});
        this.setState({novoProjeto:"",TimeId:null});
        getMyTeamsGestor(this.props.siteUrl).then(retorno =>{
            this.setState({meusTimes:retorno,exibe:false});
        })
    }
    render() {
        return (
            <div>
                <Panel
                    isOpen={true}
                    onDismiss={this._closePanel}
                    type={PanelType.medium}
                    isFooterAtBottom={true}
                    onRenderFooterContent={this._onRenderFooterContent}
                >
                    <div className="frameHist itens-track">
                        <div className="demanda-nome">
                            Projetos
                        </div>
                        {this.state.editMode?
                            <div>
                                <TextField
                                    label="Nome Projeto:"
                                    required={false}
                                    value={this.state.novoProjeto}
                                    maxLength={255}
                                    placeholder="Projeto..."
                                    onChanged={(value) => this.setState({ novoProjeto: value })}
                                />

                                <ComboBox allowFreeform={false}
                                    label="Time:"
                                    required={false}
                                    useComboBoxAsMenuWidth={true}
                                    options={this.state.times}
                                    defaultSelectedKey={this.state.TimeId}
                                    disabled={false}
                                    value = {this.state.timeName}
                                    onChanged={(value) => this.setState({TimeId:value})}
                                />
                                <DefaultButton onClick={this._salvaProjeto} style={{ marginTop: '18px' }}>Salvar</DefaultButton>
                                <DefaultButton onClick={this.Cancela} style={{ marginLeft: '4px',marginTop: '18px' }}>Cancelar</DefaultButton>
                            </div>
                        :
                        <div>
                            <div className="ms-Grid-col ms-sm6 ms-lg11 ">
                                <ComboBox allowFreeform={false}
                                    label=""
                                    required={false}
                                    useComboBoxAsMenuWidth={true}
                                    options={this.state.projetos}
                                    disabled={false}
                                    value = {this.state.projetoName}
                                    onChanged={(value) =>  this._changeProjeto(value)}
                                />
                                <TextField
                                    label="Time"
                                    required={false}
                                    value={this.state.TimeName}
                                    maxLength={255}
                                    disabled={true}
                                />
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-lg1">

                                <ActionButton
                                        data-automation-id="test"
                                        iconProps={{ iconName: 'edit' }}
                                        allowDisabledFocus={true}
                                        disabled={!this.state.exibeBtnEdit}
                                        onClick={this.edit}
                                >
                                        
                                </ActionButton>                            
                            </div>
                            <ActionButton
                                    data-automation-id="test"
                                    iconProps={{ iconName: 'AddGroup' }}
                                    allowDisabledFocus={true}
                                    disabled={false}
                                    onClick={this.create}
                            >
                                    Novo Projeto
                            </ActionButton>
                        </div>
                        }
                    </div> 
                </Panel>            
            </div>
        )}
}
export default Projeto;