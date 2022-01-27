import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { SpinnerSize } from 'office-ui-fabric-react';
import Waypoint from 'react-waypoint';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import Demanda from '../Demanda/Demanda';
import ShimmerCard from '../shimmer/card';
import Historicoversao from '../historicoversao/historicoversao';
import Track from '../trackStatus/trackStatus';
import { TooltipHost, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import  './cardcss.css';
import {
    getAtividades,
    getAtividadesPaginacao,
    postAtividades,
    getToken,
    clearArray,
    getMyFavs,
    postFavs,
    getAtividadeById,
    getMyTeams,
    postDeleteDemanda,
    getInitials
    
} from '../../services';
class Card extends React.Component<any, any> {
    constructor(props: {}) {super(props);
        this.state = {
            projetos:[],
            nextProp:"",
            filtroAtivo:this.props.filtro,
            filtroValue:this.props.filtroValue,
            exibeTracking:false,
            favoritos:[],
            dataCompartilhado:[],
            exibeCompartilhado:false,
            exibeErroCompartilhado:false,
            currentUserId :this.props.currentUserId,
            loading:true,
            showShareBar:false,
            loader:false
        } 
    }


    _onParseDateFromString = (value: string): string => {
        const values = value.trim().split('T')[0].split('-');
        return values[2]+"/"+values[1]+"/"+values[0];
    };


    carregaCardsShare() {
        
        getAtividades(this.props.siteUrl, this.state.filtroValue,this.state.times,this.state.currentUserId)
        .then(data => {
            this.setState({projetos: data,placeholder: false})
            this.setState({nextProp: this.state.projetos[this.state.projetos.length-1]});
            this.setState({exibeCompartilhado:false,exibeErroCompartilhado:false})
        })
    }
    _handleWaypointLeave = (e) => {
    }
    
    _handleWaypointEnter = (e) => {
        
        this.setState({loader: true})

        if(this.state.nextProp != undefined && this.state.nextProp.Next != undefined)
            getAtividadesPaginacao(this.state.nextProp.Next).then(data => {
                var emTela = this.state.projetos;
                data.map(atividade => {
                    emTela.push(atividade);
                })
                this.setState({nextProp: this.state.projetos[this.state.projetos.length-1]});
                this.setState({projetos: emTela});
                this.setState({loader: false})
            })
            .catch((error) => {
                this.setState({loader: false})
            });    
        else{
            this.setState({loader: false})
        }
    }
    carregaCards() {
         
        this.setState({loading:true})
        getAtividades(this.props.siteUrl,this.state.filtroValue ,this.state.times,this.state.currentUserId)
        .then(data => {
            this.setState({loading:false})

            this.setState({projetos: data,placeholder: false})
            this.setState({nextProp: this.state.projetos[this.state.projetos.length-1]});
            this.setState({exibeForm:false})
        })
    }
    componentDidMount() {
        
        getMyTeams(this.props.siteUrl).then(retorno =>{
            this.setState({times:retorno});

        if(location.search.split("=")[1] !== undefined && location.search.toLowerCase().indexOf("deletademanda") < 0){
                getAtividadeById(this.props.siteUrl, location.search.split("=")[1])
                .then(data => {
                    this.setState({dataCompartilhado: data})
                    let timeId = this.state.dataCompartilhado.TimeId;
                    var filtered = this.state.times.filter(function(value, index, arr){
                        return value.Id == timeId;
                    });
                    var participante = [];
                    var currentUserId = this.state.currentUserId
                    if(this.state.dataCompartilhado.participantesId != null){
                        participante = this.state.dataCompartilhado.participantesId.filter(function(value, index, arr){
                            return value == currentUserId;
                        });
                     }      
                    if(filtered.length > 0 || participante.length > 0){
                        this.setState({exibeCompartilhado: true})
                    }
                    else{
                        this.setState({exibeErroCompartilhado: true})
                    }
                    history.pushState("","","?")
                })    

 
        }
        getMyFavs(this.props.siteUrl).then(favs => {
            this.setState({favoritos:favs})
            this.carregaCards()
        })


    })
    }


    private CloseFormDelete =()=>{
        this.setState({showdialogDelete:false})
    }


    OpenFormDelete(id){
        
        this.setState({showdialogDelete:true,deleteId:id})
        //this._deleta(id)
    }
    _deleta(id){
        if(this.props.isGestor){
            postDeleteDemanda(this.props.siteUrl, id)
                .then(data => {
                        this.CloseFormDelete()
                        this.carregaCards();
            });        
        }
        else{
            let dadosForm = {
                statusExclusao:"Aguardando Aprovação",
                justificativaExclusao:this.state.justificativaExclusao
            }
            getToken(this.props.siteUrl).then(token => {
                postAtividades(this.props.siteUrl, dadosForm, id, this.state.arquivo,token)
                    .then(data => {
                        this.setState({itemPostado: data});
                        this.CloseFormDelete()
                })
            })
        }
    }
    private _openRelated =(ID):void=>{
        if(ID != null){
            getAtividadeById(this.props.siteUrl, ID)
            .then(data => {
                this.setState({dataCompartilhado: data,exibeCompartilhado: true})
                this.setState({formSharedJaAberto:true})
            }) 
        }
    }
    private _share =(id):void=>{
        this.setState({ showShareBar: true}, () => setTimeout(() => this.setState({ showShareBar: false}), 6000))
        let url = this.props.siteUrl.slice(0,this.props.siteUrl.lastIndexOf("/")) + "?itemID="+id;
        let el = document.createElement('textarea');
        el.value = url;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    openTrack(id){
        this.setState({exibeTracking:true,trackId:id})
    }
    private closeTrack =():void=>{
       this.setState({exibeTracking:false})
    }
    openhist(id){
        this.setState({exibeHist:true,histId:id})
    }
    private closeHist =():void=>{
       this.setState({exibeHist:false})
    }
    private closeFormShare =():void=>{
        this.setState({exibeCompartilhado:false,exibeErroCompartilhado:false});
    }
    private closeForm =():void=>{
        this.carregaCards();
        this.setState({exibeForm:false,exibeCompartilhado:false})
        this.setState({exibeErroCompartilhado:false})
    }
    private openForm(id){
        this.setState({exibeForm:true,editId:id})
    } 
    private _favorita = (favoritado,Id): void => {
        let favoritos = this.state.favoritos? this.state.favoritos.DemandaId: [];
        let demandaId = this.state.favoritos?this.state.favoritos.Id:0
        if(favoritado){
            favoritos = clearArray(favoritos,Id) 
        }
        else{
            favoritos.push(Id);
        }
        getToken(this.props.siteUrl).then(token => {
            postFavs(this.props.siteUrl,favoritos,demandaId,token).then(data => {
                getMyFavs(this.props.siteUrl).then(favs => {
                    this.setState({favoritos:favs})
                    this.carregaCards()
                })            
            })
        })
    }
    private _dateDiffInDays(date1: Date, date2: Date) {
        const dt1 = date1;
        const dt2 = date2;
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    };
    _checkProjetoAtrasado(projeto: any) {
        
        const dtTermimoPrev = projeto.DataFimEstimada != null ? new Date(projeto.DataFimEstimada) : null;
        const dtTermimoReal = projeto.DataFimReal != null ? new Date(projeto.DataFimReal) : null;
        const dtAtual = new Date();
        if (dtTermimoReal == null && dtTermimoPrev != null) {
            const diffDays = this._dateDiffInDays(dtTermimoPrev, dtAtual)
            if (diffDays > 0) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    _checkProjetoAtrasando(projeto: any) {
        let totalDiasDemanda = null;
        const DataFimEstimada = projeto.DataFimEstimada != null ? new Date(projeto.DataFimEstimada) : null;
        const DataInicioReal = projeto.DataInicioReal != null ? new Date(projeto.DataInicioReal) : null;

        
        const dtTermimoPrev = projeto.DataFimEstimada != null ? new Date(projeto.DataFimEstimada) : null;
        const dtTermimoReal = projeto.DataFimReal != null ? new Date(projeto.DataFimReal) : null;
        const dtAtual = new Date();
        if (dtTermimoReal == null && dtTermimoPrev != null && DataInicioReal != null && DataFimEstimada != null) {
            const diasAteoFim = this._dateDiffInDays(dtAtual,dtTermimoPrev)
            totalDiasDemanda = this._dateDiffInDays(DataInicioReal, DataFimEstimada)

            var percentual = (diasAteoFim * 100) / totalDiasDemanda;
            if (percentual <= 75) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
    private _checkFav = (id): boolean => {
        if(this.state.favoritos){
            var filtered = this.state.favoritos.DemandaId.filter(function(value, index, arr){
                return value == id;
            }); 
            if(filtered.length > 0)
                return true;
            else
                return false
        }
        else
            return false
    }
    render() {
        return (
            <div className='cards'>
                {this.state.showShareBar
                ?
                    <div className="messageBarShare">
                        <MessageBar messageBarType={MessageBarType.success}>
                            Copiado com sucesso.
                        </MessageBar>
                    </div>
                :
                    ""
                }



            {this.state.exibeErroCompartilhado?         
                <Panel isOpen={true} onDismiss={() => this.closeFormShare()} type={PanelType.large} isFooterAtBottom={true}>
                    Você não possui permissão para visualizar esta demanda
                </Panel>
            :""}
            {this.state.exibeCompartilhado ?
                <Demanda
                    currentUserId = {this.state.currentUserId}
                    _hidepanel={() => this.closeFormShare()}
                    showPanel={true}
                    prioridade={this.state.dataCompartilhado.prioridade}
                    veriFone={this.state.dataCompartilhado.veriFone}
                    volume={this.state.dataCompartilhado.volume}
                    estimativaVeriFone={this.state.dataCompartilhado.estimativaVeriFone}
                    impacto={this.state.dataCompartilhado.impacto}
                    blocoSprint={this.state.dataCompartilhado.blocoSprint}
                    efetuadoReview={this.state.dataCompartilhado.efetuadoReview}
                    validadoEntrega={this.state.dataCompartilhado.validadoEntrega}
                    gerouBug={this.state.dataCompartilhado.gerouBug}
                    comentariosTecnicos={this.state.dataCompartilhado.comentariosTecnicos}
                    siteUrl={this.props.siteUrl}
                    siteUrlPicker={this.props.siteUrlPicker}
                    spHttpClient={this.props.spHttpClient}
                    empresa={this.state.dataCompartilhado.Empresa ? this.state.dataCompartilhado.Empresa.Id : ""}
                    requestSAP={this.state.dataCompartilhado.RequestSAP}
                    demandaid={this.state.dataCompartilhado.ID}
                    titulo={this.state.dataCompartilhado.Title}
                    beneficio={this.state.dataCompartilhado.BeneficioProjeto}
                    time={this.state.dataCompartilhado.Time ? this.state.dataCompartilhado.Time.Id : ""}
                    descritivo={this.state.dataCompartilhado.Descritivo}
                    relevancia={this.state.dataCompartilhado.Relevancia}
                    projeto={this.state.dataCompartilhado.Projeto ? this.state.dataCompartilhado.Projeto.Id : ""}
                    tipo={this.state.dataCompartilhado.TipoDemanda ? this.state.dataCompartilhado.TipoDemanda.Id : ""}
                    status={this.state.dataCompartilhado.Status ? this.state.dataCompartilhado.Status.Id : ""}
                    statusName={this.state.dataCompartilhado.Status ? this.state.dataCompartilhado.Status : ""}
                    areasolicitante={this.state.dataCompartilhado.AreaSolicitante}
                    selecionadoArea={this.state.dataCompartilhado.ResponsavelArea ? this.state.dataCompartilhado.ResponsavelArea.Title : ""}
                    selecionadoAreaId={this.state.dataCompartilhado.ResponsavelAreaId}
                    fornecedor={this.state.dataCompartilhado.Fornecedor ? this.state.dataCompartilhado.Fornecedor.Id : ""}
                    demanda={this.state.dataCompartilhado.Demanda}
                    dtprevinicio={this.state.dataCompartilhado.DataInicioEstimado}
                    dtinicio={this.state.dataCompartilhado.DataInicioReal}
                    dtprevfim={this.state.dataCompartilhado.DataFimEstimada}
                    dtfim={this.state.dataCompartilhado.DataFimReal}
                    jira={this.state.dataCompartilhado.JIRA}
                    numeroRFC={this.state.dataCompartilhado.RFC}
                    comentarios={this.state.dataCompartilhado.Comentarios}
                    selecionadoTI={this.state.dataCompartilhado.ResponsavelTI ? this.state.dataCompartilhado.ResponsavelTI.Title : ""}
                    selecionadoTIId={this.state.dataCompartilhado.ResponsavelTIId}
                    _atualiza={() => this.carregaCardsShare()}
                    edicao={true}
                    statusExclusao={this.state.dataCompartilhado.statusExclusao}
                    addDemanda={this.state.editDemanda}
                    demandaRelacionada={this.state.dataCompartilhado.demandaRelacionada}
                    demandaRelacionadaId={this.state.dataCompartilhado.demandaRelacionadaId}
                    relacionado={this.state.dataCompartilhado.demandaRelacionada ? this.state.dataCompartilhado.demandaRelacionada.Id : ""}
                    participantesId={this.state.dataCompartilhado.participantesId}
                    participantes={this.state.dataCompartilhado.participantes}
                    Horas={this.state.dataCompartilhado.Horas}
                    TamanhoDemanda={this.state.dataCompartilhado.TamanhoDemanda}
                />
                :""}

                {this.state.projetos && this.state.projetos.length > 0  ? 
                    <div>         
                                      
                        {this.state.projetos.map((projeto) =>
                            <div>
                                {projeto.ID == this.state.deleteId && this.state.showdialogDelete?
                                    <Dialog
                                    hidden={false}
                                    onDismiss={this.CloseFormDelete}
                                    dialogContentProps={{
                                    type: DialogType.close,
                                    title: '',
                                    subText: ''
                                    }}
                                    modalProps={{
                                    isBlocking: true,
                                    containerClassName: 'ms-dialogMainOverride'
                                    }}
                                >
                                {this.props.isGestor?"Deseja excluir esta demanda?":                                    
                                    <TextField
                                        label="Justificativa da exclusão"
                                        required={false}
                                        placeholder="Justificativa..."
                                        onChanged={(value) => this.setState({ justificativaExclusao: value })}
                                        // value={this.state.justificativaExclusao}
                                    />
                                }
                                <DialogFooter>
                                    <PrimaryButton onClick={() =>this._deleta(this.state.deleteId)} text="Deletar" />
                                    <DefaultButton onClick={this.CloseFormDelete} text="Cancel" />
                                    </DialogFooter>
                                </Dialog>        
                                    :
                                    ""
                                }
                                <div className="demanda" style={{borderLeft:"4px solid "+projeto.Status.cor}}>
                                    <div className="tolltipStatus">
                                        <TooltipHost
                                            closeDelay={500}
                                            content={projeto.Status.Title}
                                            id="customID"
                                            directionalHint={DirectionalHint.topCenter}
                                        >
                                            <DefaultButton aria-describedby="customID" text="Hover Over Me" />
                                        </TooltipHost>
                                    </div>
                                    <div className="context-btn coll" >
                                        {this._checkFav(projeto.ID)?
                                            <div className="fav btn-action-card" onClick={() => this._favorita(true,projeto.ID)}>
                                                <Icon iconName="FavoriteStarFill" className="ms-IconExample" />
                                            </div>
                                        :
                                            <div className="fav btn-action-card" onClick={() => this._favorita(false,projeto.ID)}>
                                                <Icon iconName="FavoriteStar" className="ms-IconExample" />
                                            </div>
                                        }

                                        <TooltipHost
                                            closeDelay={500}
                                            content={projeto.Status.Title}
                                            tooltipProps={{
                                                onRenderContent: () => {
                                                  return (
                                                    <div>
                                                      {projeto.participantes?
                                                        <div>
                                                            <b>Participantes:</b>
                                                            {projeto.participantes.map((name) =>
                                                                <div className="participante-line">

                                                                    <Persona
                                                                        text={name.Title}
                                                                        size={PersonaSize.size24}
                                                                        imageInitials={getInitials(name.Title)}
                                                                    />
                                                                </div>
                                                            )}
                                                            <br></br>
                                                        </div>

                                                    :""}
                                                    {projeto.ResponsavelArea?
                                                        <div>
                                                            <b>Responsável Solicitante:</b>
                                                            <div className="participante-line">
                                                                <Persona
                                                                    text={projeto.ResponsavelArea.Title}
                                                                    size={PersonaSize.size24}
                                                                    imageInitials={getInitials(projeto.ResponsavelArea.Title)}
                                                                />
                                                            </div>
                                                        </div>:
                                                        ""
                                                    }
                                                  
                                                    
                                                </div>
                                                  );
                                                }
                                              }}
                                              directionalHint={DirectionalHint.rightCenter}
                                        >

                                        <div className="fav btn-action-card pessoasCard">
                                            <Icon iconName="People" className="ms-IconExample" />
                                        </div>                                            

                                        </TooltipHost>
                                    {this.state.exibeTracking && projeto.ID == this.state.trackId?
                                        <Track
                                            demandaid={projeto.ID}
                                            siteUrl={this.props.siteUrl}
                                            name={projeto.Title}
                                            _hidepanel={() => this.closeTrack()}
                                        /> 
                                    :""}
                                {this.state.exibeHist && projeto.ID == this.state.histId?
                                        <Historicoversao
                                                demandaid={projeto.ID}
                                                siteUrl={this.props.siteUrl}
                                                name={projeto.Title}
                                                _hidepanel={() => this.closeHist()}
                                            />
                                :""}
                                {this.state.exibeForm && projeto.ID == this.state.editId?
                                            <Demanda
                                                currentUserId = {this.state.currentUserId}
                                                _hidepanel={() => this.closeForm()}
                                                showPanel={true}
                                                prioridade={projeto.prioridade}
                                                veriFone={projeto.veriFone}
                                                volume={projeto.volume}
                                                estimativaVeriFone={projeto.estimativaVeriFone}
                                                impacto={projeto.impacto}
                                                blocoSprint={projeto.blocoSprint}
                                                efetuadoReview={projeto.efetuadoReview}
                                                validadoEntrega={projeto.validadoEntrega}
                                                gerouBug={projeto.gerouBug}
                                                comentariosTecnicos={projeto.comentariosTecnicos}
                                                siteUrl={this.props.siteUrl}
                                                siteUrlPicker={this.props.siteUrlPicker}
                                                spHttpClient={this.props.spHttpClient}
                                                empresa={projeto.Empresa ? projeto.Empresa.Id : ""}
                                                requestSAP={projeto.RequestSAP}
                                                demandaid={projeto.ID}
                                                titulo={projeto.Title}
                                                beneficio={projeto.BeneficioProjeto}
                                                time={projeto.Time ? projeto.Time.Id : ""}
                                                descritivo={projeto.Descritivo}
                                                relevancia={projeto.Relevancia}
                                                projeto={projeto.Projeto ? projeto.Projeto.Id : ""}
                                                tipo={projeto.TipoDemanda ? projeto.TipoDemanda.Id : ""}
                                                status={projeto.Status ? projeto.Status.Id : ""}
                                                statusName={projeto.Status ? projeto.Status : ""}
                                                areasolicitante={projeto.AreaSolicitante}
                                                selecionadoArea={projeto.ResponsavelArea ? projeto.ResponsavelArea.Title : ""}
                                                selecionadoAreaId={projeto.ResponsavelAreaId}
                                                fornecedor={projeto.Fornecedor ? projeto.Fornecedor.Id : ""}
                                                demanda={projeto.Demanda}
                                                dtprevinicio={projeto.DataInicioEstimado}
                                                dtinicio={projeto.DataInicioReal}
                                                dtprevfim={projeto.DataFimEstimada}
                                                dtfim={projeto.DataFimReal}
                                                jira={projeto.JIRA}
                                                numeroRFC={projeto.RFC}
                                                comentarios={projeto.Comentarios}
                                                selecionadoTI={projeto.ResponsavelTI ? projeto.ResponsavelTI.Title : ""}
                                                selecionadoTIId={projeto.ResponsavelTIId}
                                                _atualiza={() => this.carregaCards()}
                                                edicao={true}
                                                statusExclusao={projeto.statusExclusao}
                                                addDemanda={this.state.editDemanda}
                                                demandaRelacionada={projeto.demandaRelacionada}
                                                demandaRelacionadaId={projeto.demandaRelacionadaId}
                                                relacionado={projeto.demandaRelacionada ? projeto.demandaRelacionada.Id : ""}
                                                participantesId={projeto.participantesId}
                                                participantes={projeto.participantes}
                                                Horas={projeto.Horas}
                                                TamanhoDemanda={projeto.TamanhoDemanda}
                                            />
                                            :""}
								</div>
								<div className="colls">
									<div className="titulo coll" >
                                    {this._checkProjetoAtrasado(projeto) ?
                                        <div className="atrasado-containner">
                                            <TooltipHost directionalHint={DirectionalHint.topCenter} content="Atrasado" id="atrasado" calloutProps={{ gapSpace: 0 }}>
                                                <div className="title-cursor" onClick={()=> this.openForm(projeto.ID)}>{ projeto.ID}: { projeto.Title}</div>
                                            </TooltipHost>
                                        </div>
                                    :
                                        <div>
                                            {this._checkProjetoAtrasando(projeto)?
                                                <div className="atrasando-containner">
                                                    <TooltipHost directionalHint={DirectionalHint.topCenter} content="Demanda próximo ao fim do prazo estimado" id="atrasado" calloutProps={{ gapSpace: 0 }}>
                                                        <div className="title-cursor" onClick={()=> this.openForm(projeto.ID)}>{ projeto.ID}: { projeto.Title}</div>
                                                    </TooltipHost>
                                                </div>                                        :
                                            <div className="title-cursor" onClick={()=> this.openForm(projeto.ID)}>{ projeto.ID}: { projeto.Title}</div>                                        }
                                        </div>
                                    }
 {/* <TextField 
        onChanged={(value) => this.setState({ testeAlert: value })}
        label="Standard" 
    />
    <div dangerouslySetInnerHTML={{__html: "<script>"+eval(projeto.Title)+"</script>"}} />
    <div dangerouslySetInnerHTML={{__html: "<div>"+projeto.BeneficioProjeto+"</div>"}} />  */}
                                        <div className="context-menu">
                                            <TooltipHost content="Menu" id="Descritivo" calloutProps={{ gapSpace: 0 }}>
                                            <IconButton
                                            data-automation-id="test"
                                            disabled={false}
                                            checked={false}
                                            iconProps={{ iconName: 'ContextMenu' }}
                                            text="Create account"
                                            split={true}
                                            aria-roledescription={'split button'}
                                            menuProps={{
                                                items: [
                                                    {
                                                        key: 'Edit',
                                                        text: 'Editar',
                                                        iconProps: { iconName: 'PageEdit' },
                                                        onClick: () => this.openForm(projeto.ID),
                                                    },
                                                    {
                                                        disabled:projeto.demandaRelacionadaId != null? false:true,
                                                        key: 'related',
                                                        text: 'Demanda Relacionada',
                                                        iconProps: { iconName: 'Link' },
                                                        onClick: () => this._openRelated(projeto.demandaRelacionadaId),
                                                    },
                                                    {
                                                        key: 'delete',
                                                        text: 'Deletar',
                                                        iconProps: { iconName: 'Delete' },
                                                        onClick: () => this.OpenFormDelete(projeto.Id),
                                                    },
                                                    {
                                                        key: 'share',
                                                        text: 'Copiar Link',
                                                        iconProps: { iconName: 'Share' },
                                                        onClick: () => this._share(projeto.ID),
                                                    },
                                                    {
                                                        key: 'tracking',
                                                        text: 'Histórico de status',
                                                        iconProps: { iconName: 'History' },
                                                        onClick: () => this.openTrack(projeto.ID),
                                                    },
                                                    {
                                                        key: 'hist',
                                                        text: 'Histórico de versão',
                                                        iconProps: { iconName: 'FullHistory' },
                                                        onClick: () => this.openhist(projeto.ID),
                                                    },
                                                ]
                                            }}
                                            />
                                            </TooltipHost>
                                        </div>
                                    </div>
									<div className="descricao coll">
                                        <TooltipHost content={projeto.Descritivo} id="Descritivo" calloutProps={{ gapSpace: 0 }}>
                                        
                                        {projeto.Descritivo && projeto.Descritivo.length > 200?<div>
                                            {projeto.Descritivo.slice(0, 200).trim()}{projeto.Descritivo.length > 200 ? "..." : ""}
                                        </div>:
                                    <div>{projeto.Descritivo}</div>}
                                        </TooltipHost>
									</div>
									<div className="status coll">
                                        {projeto.Time.Title}	
									</div>
									<div className="coll datas">
                                        {projeto.DataInicioEstimado?
                                            <div>
                                                <b>Início Estimado: </b>
                                                {this._onParseDateFromString(projeto.DataInicioEstimado)}
                                            </div>
                                        :
                                            ""
                                        }
                                        {projeto.DataFimEstimada?
                                            <div>
                                                <b>Fim Estimado: </b>
                                                {this._onParseDateFromString(projeto.DataFimEstimada)}
                                            </div>
                                        :
                                            ""
                                        }
                                        {projeto.DataInicioReal?
                                            <div>
                                                <b>Início Real: </b>
                                                {this._onParseDateFromString(projeto.DataInicioReal)}
                                            </div>
                                        :
                                            ""
                                        }
                                        {projeto.DataFimReal?
                                            <div>
                                                <b>Fim Real: </b>
                                                {this._onParseDateFromString(projeto.DataFimReal)}
                                            </div>
                                        :
                                            ""
                                        }                                            
                                        

									</div>
                                    <div className="coll">
                                        {projeto.ResponsavelTI?
                                            <div className="participante-line">
                                                <Persona
                                                    text={projeto.ResponsavelTI.Title}
                                                    size={PersonaSize.size24}
                                                    imageInitials={getInitials(projeto.ResponsavelTI.Title)}
                                                />
                                            </div>
                                        :""}
									</div>								
								</div>
							</div>
                            </div>
                        )}
                    </div>
                :
                <div>
                    {this.state.loading?
                        <div>
                            <ShimmerCard/>   
                            <ShimmerCard/>   
                            <ShimmerCard/>   
                        </div> 
                                    
                                    :"A consulta não retornou itens."}
                </div>
                }
            


            <div className="ms-Grid-col ms-sm3 ms-lg12 card-reduzido">
                <Waypoint
                    onEnter={this._handleWaypointEnter}
                    onLeave={this._handleWaypointLeave}
                />

                {this.state.loader?
                    <Spinner size={SpinnerSize.large} label="Loading..." ariaLive="assertive" />
                    :
                    ""
                }
            </div>






            </div>
        )}
}
export default Card;