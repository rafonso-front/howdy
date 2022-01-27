import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
// import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
// import { SpinnerSize } from 'office-ui-fabric-react';
import {
    postDeleteDemanda,
    getToken,
    postAtividades,
    getItembeforeDelete
}from '../../services';
class Exclui extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
          this.state = {
            itemID: this.props.itemID,
            siteUrl:this.props.siteUrl,
            
            exibeExclusao:false,
            sempremissao:true,
            itemExcluido:false,
            nameProjeto:"",
            cancelaExclusao:false,
            mensagemCancelamentoExclusao:"Exclusão indisponível."
          }
    }
    componentDidMount() {

                if(this.props.isGestor)
                {
                    this.setState({exibeExclusao:true})
                    this.setState({sempremissao:false})
                    this.validaItem();
                }
                else if(this.props.isMember)
                {
                    this.setState({sempremissao:true})
                    this.setState({exibeExclusao:false})
                    this.validaItem();
                }


    }
    validaItem(){
        getItembeforeDelete(location.search.split("=")[1],this.props.siteUrl,"ControleDemandas").then(data => {
            if(data != undefined){

                this.setState({projeto:data})

                if(this.state.projeto.statusExclusao == "" || this.state.projeto.statusExclusao == null){
                    this.setState({exibeExclusao:false})
                    this.setState({sempremissao:false,cancelaExclusao:true})
                }
                this.setState({itemExcluido:false})
            }
            else{
                this.setState({itemExcluido:true})
            }
        })

    }
    render() {
        return (
            <div>
                {this.state.itemExcluido? 
                        <MessageBar
                        messageBarType={MessageBarType.error}
                    >
                        Este item foi excluído.
                    </MessageBar>
                    
                    :
                    <div>
                {this.state.exibeExclusao ?
                //    
<div className="deletar">


                            <h2>Foi solicitada a exclusão do item abaixo:
                            <br/> 
                            {this.state.projeto.ID}: {this.state.projeto.Title} </h2>
                            <br/>
                            <br/>
                            <br/>
                            Justificativa:
                            <br/>
                            {this.state.projeto.justificativaExclusao}
                            <br/>
                            <br/>
                            <br/>
                            <PrimaryButton onClick={this._excluiFicha} text="Excluir" />&nbsp;&nbsp;&nbsp;&nbsp;
                            <DefaultButton onClick={this._cancelaExclusao} text="Cancelar exclusão" /> 
                        </div> 
                :
                <div>
                    {this.state.sempremissao?
                        <MessageBar
                            messageBarType={MessageBarType.error}
                        >
                            Você não possui permissão para aprovar exclusões
                        </MessageBar>
                    :
                        <div>
                            {this.state.cancelaExclusao?
                                <MessageBar
                                messageBarType={MessageBarType.info}
                            >
                            <div>
                                {this.state.mensagemCancelamentoExclusao}

                            </div>
                                
                            </MessageBar>
                                :""}
                        </div>
                    }
                </div>

                }
                    </div>
                } 


            </div>
        )
    }
    private _cancelaExclusao = ():void => {
        debugger
        let dadosForm = {
            statusExclusao:"",
            justificativaExclusao:""
        }
        getToken(this.props.siteUrl).then(token => {
            postAtividades(this.props.siteUrl, dadosForm, location.search.split("=")[1], false,token)
                .then(data => {
                    this.setState({mensagemCancelamentoExclusao:"Cancelamento de exclusão realizado com sucesso."})
                    this.setState({exibeExclusao:false})
                    this.setState({sempremissao:false,cancelaExclusao:true})
            })
        })
    }
    private _excluiFicha = ():void => {
        postDeleteDemanda(this.props.siteUrl,location.search.split("=")[1])
        .then(() => {
                //window.location.href = "Home.aspx";
                this.setState({exibeExclusao:false});
                this.setState({itemExcluido:true})
            })    
    }
} 
export default Exclui;