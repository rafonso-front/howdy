import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import axios from 'axios';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Shimmer, ShimmerElementType as ElemType } from 'office-ui-fabric-react/lib/Shimmer';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import Usuarios from '../Usuarios/Usuarios';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import * as React from 'react';
import {
    getTeamById,
    getToken,
    postEquipe,
    getMyTeamsGestor,
    timesMembrosByID,
} from '../../services';
class Times extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
          this.state = {
            meusTimes:[],
            exibe:false,
            urlIframe:"",
            selecionado:[],
            responsaveltiid:[],
            ret:[],
            exibePeoplePicker:true,
            timeId:0,
            editTeam:true,
            erroMsg:[],
            IsMember:false,
        }
    }
    private _closePanelTimes = (): void => {
        this.setState({urlIframe:"",exibe:false});
        this.props._closePanel ? this.props._closePanel() : null;
    }
    private _changeTeam = (comboValue):void => {
        this.setState({exibeErro:false})
        this.setState({ exibePeoplePicker: false}, () => setTimeout(() => this.setState({ exibePeoplePicker:true,timeId:comboValue.Id}), 1000))
        getTeamById(this.props.siteUrl,comboValue.Id).then(retorno =>{
            this.setState({ret:retorno})
            let people: (IPersonaProps & { key: string | number })[] = [];
            let ids = [];
            if(this.state.ret.Membros)
            {
                this.state.ret.Membros.map((mapRetornoItem) => {
                    people.push(
                        {
                            key: mapRetornoItem.Id,
                            imageUrl: "",
                            imageInitials: mapRetornoItem.Title.substring(0,1)+mapRetornoItem.Title.split(" ")[mapRetornoItem.Title.split(" ").length -1].substring(0,1),
                            text: mapRetornoItem.Title,
                            secondaryText: '',
                            tertiaryText: '',
                            optionalText: '',
                        }
                    )
                    ids.push(mapRetornoItem.Id);
                });
                this.setState({selecionado:people,responsaveltiid:ids})
                this.setState({usersParaValidar:people});
            }
            else{
                this.setState({selecionado:[],responsaveltiid:[]})
                this.setState({usersParaValidar:[]});
                }
        })
    }
    componentDidMount() {
        getMyTeamsGestor(this.props.siteUrl).then(retorno =>{
			this.setState({meusTimes:retorno,exibe:false});
        })
    }
    _getidUser(id) {
        if (id.length > 0) {
            let itens = [];
            let users = [];
            id.map((mapRetornoItem) => {
                if(mapRetornoItem.key){
                    itens.push(mapRetornoItem.key);
                    users.push(mapRetornoItem);
                }
                else{
                    itens.push(mapRetornoItem._user.Id)
                    users.push({"key":mapRetornoItem._user.Id,"text":mapRetornoItem._user.Title})
                }
            })
            this.setState({ responsaveltiid: itens,usersParaValidar:users })
        }
        else 
            this.setState({ responsaveltiid: null })
    }
    private createTeam = ():void=>{
        this.setState({responsaveltiid: [],usersParaValidar:[] })
        this.setState({selecionado:[]})

        this.setState({editTeam:false});
    }
    private cancelaEdicao = ():void=>{
        this.setState({ responsaveltiid: [],usersParaValidar:[] })
        this.setState({selecionado:[]})
        this.setState({editTeam:true});
    }
    
    private _salvaEquipeTime = (novo): void => {
        if(this.state.responsaveltiid.length > 0 && this.state.responsaveltiid && this.state.nomeTime !="")
        {
            let dadosForm = {}
            axios.get(this.props.siteUrl + "_api/web/currentUser")
            .then((response) => {
                if(novo){
                    dadosForm = {
                        MembrosId: this.state.responsaveltiid,
                        Title:this.state.nomeTime,
                        GestorId:[response.data.Id]
                    }        
                }
                else{
                    dadosForm = {
                        MembrosId: this.state.responsaveltiid,
                    }
                }
                getToken(this.props.siteUrl).then(token => {
                    postEquipe(this.props.siteUrl, dadosForm, this.state.timeId, token,)
                    .then(data => {
                        this.setState({exibeErro:false,IsMember: false});
                        this.setState({editTeam:true});
                        getMyTeamsGestor(this.props.siteUrl).then(retorno =>{
                            this.setState({meusTimes:retorno,exibe:false});
                        })
                        this.setState({IsMember: false});
                        this.setState({Sucesso: true}, () => setTimeout(() => this.setState({ Sucesso: false}), 5000));
                        this.setState({responsaveltiid: [],usersParaValidar:[] })
                        this.setState({selecionado:[]})
                    }) 
                })  
                // let msg = [];
                // var count = 0;
                // this.state.usersParaValidar.map((userId) => {
                //     let user= userId;
                //     timesMembrosByID(this.props.siteUrl,userId.key).then(userRetorno =>{
                //         count++
                //         this.setState({retornoValicacaoUserEmTime:userRetorno});
                //         var i =0;
                //         for (i = 0; i < this.state.retornoValicacaoUserEmTime.length; i++) { 
                //             if(this.state.timeId != this.state.retornoValicacaoUserEmTime[i].Id){
                //                 msg.push("O Colaborador "+ user.text+" é membro do time " +this.state.retornoValicacaoUserEmTime[i].Title );
                //             }
                //         }
                //         //if(msg.length <1 && count == this.state.usersParaValidar.length){
                //        // }
                //         //else{
                //             //if(count == this.state.usersParaValidar.length)
                //             //{
                //                 this.setState({erroMsg:msg});
                //                 this.setState({ IsMember: true}, () => setTimeout(() => this.setState({ IsMember: false}), 5000))
                //             //}
                //         //}                        
                //     })
                // });
            })
        }
        else{
            this.setState({ exibeErro: true}, () => setTimeout(() => this.setState({ exibeErro: false}), 5000))
        }
    }
    private _onRenderFooterContent = (): JSX.Element => {
        return (
            <div>
                {this.state.IsMember && this.state.erroMsg.length > 0?
                    <MessageBar messageBarType={MessageBarType.blocked}>
                        <span dangerouslySetInnerHTML = {{__html: this.state.erroMsg.join(" <br/> ")}}></span>
                    </MessageBar>
                :
                    ""
                }
                {this.state.Sucesso?
                    <MessageBar messageBarType={MessageBarType.success}>Salvo com sucesso!</MessageBar>
                :
                    ""
                }
                {this.state.exibeErro?
                    <MessageBar messageBarType={MessageBarType.error}>Os campos são obrigatórios</MessageBar>
                :
                    ""
                }
                {this.state.editTeam?
                    <div>                
                        <PrimaryButton disabled={this.state.disableOnsaving}  onClick={() => this._salvaEquipeTime(false)} style={{ marginRight: '8px' }}>Salvar</PrimaryButton>
                        <DefaultButton  onClick={this._closePanelTimes} style={{ marginRight: '8px' }}>Fechar</DefaultButton>
                    </div>
                    :   
                    <div>
                        <PrimaryButton disabled={true}  onClick={() => this._salvaEquipeTime(false)} style={{ marginRight: '8px' }}>Salvar</PrimaryButton>
                        <DefaultButton disabled={false}  onClick={this._closePanelTimes} style={{ marginRight: '8px' }}>Fechar</DefaultButton>
                    </div>
                }
            </div>
        );
    };
    render() {
        return (
            <div>
                <Panel
                    isOpen={true}
                    onDismiss={this._closePanelTimes}
                    type={PanelType.medium}
                    isFooterAtBottom={true}
                    onRenderFooterContent={this._onRenderFooterContent}
                >
                    <div className="frameHist itens-track">
                    <div className="demanda-nome">
                        Meus times
                    </div>
                    {this.state.editTeam?
                        <div><div className="ms-Grid-col ms-sm6 ms-lg12 ">
                        <ComboBox allowFreeform={false}
                            label="Time:"
                            required={false}
                            useComboBoxAsMenuWidth={true}
                            options={this.state.meusTimes}
                            disabled={false}
                            value = {this.state.timeName}
                            onChanged={(value) =>  this._changeTeam(value)}
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-lg12">
                        <Label required={true}>
                            Membros:
                        </Label>
                        {this.state.exibePeoplePicker?
                            <div>
                            {this.state.selecionado.length > 0?
                                <Usuarios
                                    itemLimit={10}
                                    siteUrl={this.props.siteUrl}
                                    siteUrlPicker={this.props.siteUrlPicker}
                                    spHttpClient={this.props.spHttpClient}
                                    typePicker={"normal"}
                                    principalTypeUser={true}
                                    principalTypeSharePointGroup={null}
                                    principalTypeSecurityGroup={null}
                                    principalTypeDistributionList={null}
                                    numberOfItems={15}
                                    selecionado={this.state.selecionado}
                                    selecionados={this.state.selecionado}
                                    _getidUser={(val) => this._getidUser(val)}
                                />
                            :
                            <Usuarios
                                itemLimit={200}
                                siteUrl={this.props.siteUrl}
                                siteUrlPicker={this.props.siteUrlPicker}
                                spHttpClient={this.props.spHttpClient}
                                typePicker={"normal"}
                                principalTypeUser={true}
                                principalTypeSharePointGroup={null}
                                principalTypeSecurityGroup={null}
                                principalTypeDistributionList={null}
                                numberOfItems={15}
                                _getidUser={(val) => this._getidUser(val)}
                            />                    
                            }
                            </div>
                        :
                        <Shimmer shimmerElements={[{ type: ElemType.line, height: 40, width: '100%' }]} />
                    }
                    </div>
                    <ActionButton
                        data-automation-id="test"
                        iconProps={{ iconName: 'AddGroup' }}
                        allowDisabledFocus={true}
                        disabled={false}
                        onClick={this.createTeam}
                    >
                        Novo Time
                    </ActionButton>
                    </div>
            :
                    <div>
                    <div className="ms-Grid-col ms-sm6 ms-lg12">
                        <Label required={true}>
                            Time:
                        </Label>
                        <TextField
                            label=""
                            required={false}
                            maxLength={255}
                            placeholder="Time..."
                            onChanged={(value) => this.setState({ nomeTime: value })}
                        /></div>
                    <div className="ms-Grid-col ms-sm6 ms-lg12">
                    <Label required={true}>
                            Membros:
                        </Label>
                        <Usuarios
                            itemLimit={200}
                            siteUrl={this.props.siteUrl}
                            siteUrlPicker={this.props.siteUrlPicker}
                            spHttpClient={this.props.spHttpClient}
                            typePicker={"normal"}
                            principalTypeUser={true}
                            principalTypeSharePointGroup={null}
                            principalTypeSecurityGroup={null}
                            principalTypeDistributionList={null}
                            numberOfItems={15}
                            _getidUser={(val) => this._getidUser(val)}
                        /> </div>
                        <div className="ms-Grid-col ms-sm6 ms-lg12">
                        <br/>
                            <DefaultButton  onClick={() => this._salvaEquipeTime(true)} style={{ marginRight: '8px' }}>Salvar</DefaultButton>
                            <DefaultButton  onClick={this.cancelaEdicao} style={{ marginRight: '8px' }}>Cancela</DefaultButton>
                        </div>
                    </div>
 


                }
                    </div> 
                </Panel>            
            </div>
        )}
}
export default Times;