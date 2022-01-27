import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { ComboBox, IComboBoxOption, VirtualizedComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import Axios from 'axios';
import { TooltipHost, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import Usuarios from '../Usuarios/Usuarios';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import Subfiltro from './subfiltro'
import {
    getLookUp,
    getMyTeams,
    getMyFavs,
    clearArray,
    getToken,
    clearArraySubFiltro,
    postFiltro,
    meusFiltros,
    getInitials,
    filtroById,
    deleteFiltro,
} from '../../services';
class Filtro extends React.Component <any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showUserField:true,
            showUserFieldTI:true,
            listaTimes:false,
            times: [],
            timesSelecionados:[],
            listaStatus:false,
            statusList: [],
            StatusSelecionados:[],
            listaTipos:false,
            tipos:[],
            tiposSelecionados:[],
            relevancias:[],
            relevanciaSelecionados:[],
            textoSelecionado:"",
            pessoaSelecionada:[],
            participanteSelecionado:[],
            favoritosIds:[],
            favoritoCheck: this.props.favoritoCheck,
            relevanciaText:[],
            statusText:[],
            tipoText:[],
            timeText:[],
            pessoaText:[],
            participanteText:[],
            titleOrIdText:[],
            nomefiltroDinamico:"Selecione Filtro",
            mensagemSalvafiltroErro:false,
            IDFiltroEscolhido:0
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.favoritoCheck !== this.props.favoritoCheck){
            this.getFavs().then(retorno => {
                if(nextProps.favoritoCheck)
                    this.validaFiltro(retorno,"favorito",true,"");
                else    
                    this.validaFiltro(retorno,"favorito",false,"");
            })
        }
    }
    componentDidMount() {
        this.loadLookup("");
        this.buildComboFiltro();
    }
    private buildComboFiltro = (): void => {
        Axios.get(this.props.siteUrl + "_api/web/currentUser")
        .then((response) => {
            this.setState({CUser:response})
            meusFiltros(this.props.siteUrl,this.state.CUser.data.Email).then(retorno =>{
                this.setState({meusFiltros:retorno});
            });
        })
    }    
    private changeFiltro = (nivel): void => {
        this.setState({nomefiltroDinamico:nivel.Title})
        this.setState({nomeFiltroEscolhido:nivel.Title,IDFiltroEscolhido:nivel.Id})
        this.buildFiltroSalvo(nivel);
    }

    _defineUsers = (usersID,Id) =>{
        let ids: (IPersonaProps & { key: string | number })[] = [];

        if(usersID!= undefined)
        {    
            [usersID].map(user=>{
                ids.push(
                    {
                        key: Id,
                        imageUrl: "",
                        imageInitials: getInitials(user.Title),
                        text: user.Title,
                        secondaryText: '',
                        tertiaryText: '',
                        optionalText: '',
                    }
                )            
            })
        }
        return ids;
    }
    private loadLookup = (nivel): void => {
        getMyTeams(this.props.siteUrl).then(retorno =>{
			this.setState({times:retorno,listaTimes:true});
        })
        getLookUp(this.props.siteUrl,"Status","Ordem","").then(retorno =>{
            this.setState({statusList:retorno,listaStatus:true});
        })
        getLookUp(this.props.siteUrl,"TipoDemanda","Title","").then(retorno =>{
            this.setState({tipos:retorno,listaTipos:true});
        })
    }
    private buildFiltroSalvo(nivel: any) {
        if (nivel.Id == 0) {
            this.limpaFiltro();
        }
        else {
            this.setState({titleOrIdText:[]});
            this.setState({pessoaText:[]});
            this.setState({participanteText:[]});
            this.setState({relevanciaText:[]});
            this.setState({tipoText:[]});
            this.setState({statusText:[]});
            this.setState({timeText:[]});
    
            this.setState({timesSelecionados:[]});
            this.setState({StatusSelecionados:[]});
            this.setState({tiposSelecionados:[]});
            this.setState({relevanciaSelecionados:[]});
            this.setState({favoritosIds:[]});
            this.setState({textoSelecionado:""});
            this.setState({pessoaSelecionada:[]});
            this.setState({participanteSelecionado:[]});

            filtroById(this.props.siteUrl, nivel.Id).then(retorno => {
                this.setState({ retornoConsulta: retorno });
                this.state.retornoConsulta.map((retorno) => {
                    let relevancias = retorno.relevancias != null ? retorno.relevancias : "";
                    if (relevancias != "") {
                        relevancias.split(";#").map((relevancia) => {
                            this.validaFiltro(relevancia, "Relevancia", true, relevancia);
                        });
                    }
                    retorno.status.map((Status) => {
                        this.validaFiltro(Status.Id, "Status", true, Status.Title);
                    });
                    retorno.tipos.map((Tipo) => {
                        this.validaFiltro(Tipo.Id, "Tipo", true, Tipo.Title);
                    });
                    retorno.times.map((Times) => {
                        this.validaFiltro(Times.Id, "Time", true, Times.Title);
                    });
                    if (retorno.textos != null)
                        this.validaFiltro(retorno.textos, "TitleText", true, retorno.textos);
                    if (retorno.pessoas != undefined)
                        this.validaFiltro(this._defineUsers(retorno.pessoas, retorno.pessoasId), "ResponsavelTI", true, null);
                    if (retorno.participantes != undefined)
                        this.validaFiltro(this._defineUsers(retorno.participantes, retorno.participantesId), "Participante", true, null);
                });
            });
        }
    }
    private getFavs (){
        let favs = [];
        return getMyFavs(this.props.siteUrl).then(retorno => {
            this.setState({result:retorno})
            this.setState({favRetorno:this.state.result.DemandaId});
            favs = this.state.favRetorno;
            return favs;
        });
    }
    private removeFiltro(regId,TipoFiltro,add,regText){
        this.validaFiltro(regId,TipoFiltro,add,regText);
    }

    private salvaFiltro(nomeFiltro){
        Axios.get(this.props.siteUrl + "_api/web/currentUser")
        .then((response) => {
            this.setState({CUser:response})
            this.gravaFiltro(this.state.CUser.data.Email,nomeFiltro,true,null);
            this.setState({ exibemsgSucesso:true}, () => setTimeout(() => this.setState({exibemsgSucesso:false}), 2000))

        })
    }
    private excluirFiltro(){
        deleteFiltro(this.props.siteUrl,this.state.IDFiltroEscolhido) .then((response) => {
            this.limpaFiltro();
            this.setState({ exibemsgSucesso:true}, () => setTimeout(() => this.setState({exibemsgSucesso:false}), 2000))
        })
    }
    private salvaEditado(){
        Axios.get(this.props.siteUrl + "_api/web/currentUser")
        .then((response) => {
            this.setState({CUser:response})
            this.gravaFiltro(this.state.CUser.data.Email,this.state.nomeFiltroEscolhido,false,this.state.IDFiltroEscolhido);
            this.setState({ exibemsgSucesso:true}, () => setTimeout(() => this.setState({exibemsgSucesso:false}), 2000))
        })
    }
    private gravaFiltro(userMail,nomeFiltro,novo,Id){


        let times = this.state.timesSelecionados;
        let status = this.state.StatusSelecionados;
        let tipos = this.state.tiposSelecionados;
        let relevancias = this.state.relevanciaSelecionados;
        let pessoas = this.state.pessoaSelecionada.length > 0?this.state.pessoaSelecionada[0].key == undefined ? this.state.pessoaSelecionada[0]._user.Id : this.state.pessoaSelecionada[0].key : null;
        let participantes = this.state.participanteSelecionado.length > 0?this.state.participanteSelecionado[0].key == undefined ? this.state.participanteSelecionado[0]._user.Id : this.state.participanteSelecionado[0].key : null;



        //let participantes = this.state.participanteSelecionado.length > 0?this.state.participanteSelecionado[0]._user.Id : null;
        let textos = this.state.textoSelecionado;
        
        let dadosFiltro = {}
        dadosFiltro = {
            Title: nomeFiltro,
            timesId: this._buildMultiLookUp(times),
            statusId: this._buildMultiLookUp(status),
            tiposId: this._buildMultiLookUp(tipos),
            relevancias: relevancias.join(";#"),
            pessoasId: pessoas,
            participantesId: participantes,
            textos:textos,
            emailResponsavelFiltro:userMail
        }
        getToken(this.props.siteUrl).then(token => {
            postFiltro(this.props.siteUrl, dadosFiltro, Id, this.state.arquivo,token)
            .then(data => {
                this.buildComboFiltro();
            }) 
        })
    }
    _buildMultiLookUp(id) {
        if (id.length > 0) {
            let itens = [];
            id.map((mapRetornoItem) => {
                if(mapRetornoItem){
                    itens.push(mapRetornoItem)
                }
                else{
                    itens.push(mapRetornoItem._user.Id)
                }
            })
            return itens
        }
        else {
            return []
        }
    }
    private limpaFiltro(){
        this.buildComboFiltro();

        this.setState({titleOrIdText:[]});
        this.setState({pessoaText:[]});
        this.setState({participanteText:[]});
        this.setState({relevanciaText:[]});
        this.setState({tipoText:[]});
        this.setState({statusText:[]});
        this.setState({timeText:[]});

        this.setState({timesSelecionados:[]});
        this.setState({StatusSelecionados:[]});
        this.setState({tiposSelecionados:[]});
        this.setState({relevanciaSelecionados:[]});
        this.setState({favoritosIds:[]});
        this.setState({textoSelecionado:""});
        this.setState({pessoaSelecionada:[]});
        this.setState({participanteSelecionado:[]});
        this.setState({nomefiltroDinamico:"Selecione Filtro"});
        
        this.setState({IDFiltroEscolhido:0})



        this.props._filtro ? this.props._filtro("") : null;
    }
    private validaFiltro(regId,TipoFiltro,add,regText){
        let filtroCasado = [];

        let time = this.state.timesSelecionados;
        let status = this.state.StatusSelecionados;
        let tipo = this.state.tiposSelecionados;
        let relevancia = this.state.relevanciaSelecionados;
        let pessoa = this.state.pessoaSelecionada;
        let participante = this.state.participanteSelecionado;
        let texto = this.state.textoSelecionado;
        let favoritos = this.state.favoritosIds;

        let relevanciaText = this.state.relevanciaText;
        let statusText = this.state.statusText;
        let tipoText = this.state.tipoText;
        let timeText = this.state.timeText;
        let pessoaText = this.state.pessoaText;
        let participanteText = this.state.participanteText;
        let titleOrIdText = this.state.titleOrIdText;
        
        if(add){
            if(TipoFiltro == "Time"){
                time.push(regId);
                timeText.push({"ID":regId,"Text":regText});
            }
            if(TipoFiltro == "favorito"){
                favoritos = regId;
            }
            if(TipoFiltro == "Status"){
                status.push(regId);
                statusText.push({"ID":regId,"Text":regText});

            }
            if(TipoFiltro == "Tipo"){
                tipo.push(regId);
                tipoText.push({"ID":regId,"Text":regText});

            }
            if(TipoFiltro == "Relevancia"){
                relevancia.push(regId);
                relevanciaText.push({"ID":regId,"Text":regText});

            }
            if(TipoFiltro == "ResponsavelTI"){
                
                pessoaText.push(regId);
                pessoa = regId;
            }
            if(TipoFiltro == "Participante"){
                participanteText.push(regId);
                participante = regId;
            }

            if(TipoFiltro == "TitleText"){
                texto = regId;
                titleOrIdText = regId;
            }
        }
        else{
            if(TipoFiltro == "Time")
            {
                time = clearArray(time,regId)
                timeText = clearArraySubFiltro(timeText,regText)
            }
            if(TipoFiltro == "favorito")
            {
                this.props.uncheckFav ? this.props.uncheckFav() : null;
                favoritos = [];
            }
            if(TipoFiltro == "Status")
            {
                
                statusText = clearArraySubFiltro(statusText,regText)
                status = clearArray(status,regId)
            }
            if(TipoFiltro == "Tipo")
            {
                tipoText = clearArraySubFiltro(tipoText,regText)
                tipo = clearArray(tipo,regId)
            }
            if(TipoFiltro == "Relevancia")
            {
                relevanciaText = clearArraySubFiltro(relevanciaText,regText)
                relevancia = clearArray(relevancia,regId)
            }
            if(TipoFiltro == "ResponsavelTI")
            {
                pessoaText = []
                pessoa=[];
                this.setState({ showUserFieldTI:false}, () => setTimeout(() => this.setState({showUserFieldTI:true}), 300))
            }
            if(TipoFiltro == "Participante")
            {
                participanteText = []
                participante=[];
                this.setState({ showUserField:false}, () => setTimeout(() => this.setState({showUserField:true}), 300))
            }
            
            if(TipoFiltro == "TitleText")
            {
                titleOrIdText = ""
                texto="";
            }
        }
        this.setState({titleOrIdText:titleOrIdText});
        this.setState({pessoaText:pessoaText});
        this.setState({participanteText:participanteText});
        this.setState({relevanciaText:relevanciaText});
        this.setState({tipoText:tipoText});
        this.setState({statusText:statusText});
        this.setState({timeText:timeText});

        this.setState({timesSelecionados:time});
        this.setState({StatusSelecionados:status});
        this.setState({tiposSelecionados:tipo});
        this.setState({relevanciaSelecionados:relevancia});
        this.setState({favoritosIds:favoritos});
        this.setState({textoSelecionado:texto});
        this.setState({pessoaSelecionada:pessoa});
        this.setState({participanteSelecionado:participante});

        if(time.length > 0){
            filtroCasado.push("(TimeId eq "+ time.join(" or TimeId eq ") +")")
        }
        if(favoritos.length > 0){
            filtroCasado.push("(Id eq "+ favoritos.join(" or Id eq ") +")")
        }
        if(relevancia.length > 0){
            filtroCasado.push("(Relevancia eq '"+ relevancia.join("' or Relevancia eq '") +"')")
        }
        if(status.length > 0){
            filtroCasado.push("(StatusId eq "+ status.join(" or StatusId eq ") +")")
        }
        if(tipo.length > 0){
            filtroCasado.push("(TipoDemandaId eq "+ tipo.join(" or TipoDemandaId eq ") +")")
        }
        if(pessoa.length> 0){
            if(pessoa[0].User==undefined)
                filtroCasado.push("(ResponsavelTI/Title eq '"+pessoa[0].text+"')")
            else
                filtroCasado.push("(ResponsavelTI/Title eq '"+pessoa[0].User.Title+"')")
        }
        if(participante.length> 0){
            if(participante[0].User==undefined)
                filtroCasado.push("(participantes/Title eq '"+participante[0].text+"')")
            else
                filtroCasado.push("(participantes/Title eq '"+participante[0].User.Title+"')")

            // filtroCasado.push("(participantes/Title eq '"+participante[0].User!=undefined ? participante[0].User.Title:participante[0].text+"')")
        }
        if(texto.length> 0){            
            if(isNaN(texto))
                filtroCasado.push('substringof(\''+texto+'\',Title)')
            else
                filtroCasado.push("ID eq "+texto)
        }
        this.props._filtro ? this.props._filtro(filtroCasado.join(" and ")) : null;
        return filtroCasado.join(" and ")
    }

    private _changeCheckBox =(id,element,checked,TipoFiltro,text):void=>{
        this.validaFiltro(id,TipoFiltro,checked,text);
    }
    _handleSelection(filterName: string, id) {
        if (id.length > 0) {
            this.validaFiltro(id,filterName,true,"")
        }
        else
        {
            this.validaFiltro(id,filterName,false,"")
        }
    }
    render () { 
        return (
            <div className="filtros">
            <div className="left">


            <div className="filtro drp-filtro filtrosSalvos">
                <div className="menu-visivel img">
                    <Icon iconName="CaretSolidDown" className="ms-IconExample" />
                </div>
                <div className="menu-visivel lbl sempreVisivel">
                    {this.state.nomefiltroDinamico}
                </div>
                <div className="menu-visivel lbl">
                    <ComboBox 
                        allowFreeform={false}
                        label=""
                        text={this.state.nomefiltroDinamico}
                        required={false}
                        useComboBoxAsMenuWidth={true}
                        defaultSelectedKey="0"
                        options={this.state.meusFiltros}
                        onChanged={(value) => this.changeFiltro(value)}
                        styles={{
                            container: {
                              maxWidth: '300px'
                            },
                            // Light purple input background
                            root: {
                              backgroundColor: '#c03627'
                            },
                            input: {
                              backgroundColor: '#c03627'
                            }
                          }}


                    />                
                </div>
				
            </div>
                <div className="relevancia drp-filtro">
                    <div className="menu-visivel img">
                        <Icon iconName="CaretSolidDown" className="ms-IconExample" />
                    </div>
                    <div className="menu-visivel lbl">
                        Relevância
                    </div>
                    <div className="sub-filtro">
                    <div>
                    <div>
                        <Checkbox
                            label="Sim"
                            
                            checked = {this.state.relevanciaSelecionados.includes("Sim")}
                            defaultChecked={false}
                            onChange={(element,checked) => this._changeCheckBox("Sim",element,checked,"Relevancia","Sim")}
                        />  
                        </div> 
                        <div>
                            <Checkbox
                                label="Não"
                                checked = {this.state.relevanciaSelecionados.includes("Não")}
                                defaultChecked={false}
                                onChange={(element,checked) => this._changeCheckBox("Não",element,checked,"Relevancia","Não")}
                            />  
                        </div> 
                        </div> 
                    </div>
                </div>
                <div className="status drp-filtro">
                    <div className="menu-visivel img">
                        <Icon iconName="CaretSolidDown" className="ms-IconExample" />
                    </div>
                    <div className="menu-visivel lbl">
                        Status
                    </div>
                    <div className="sub-filtro">
                        {this.state.listaStatus
                            ?
                            <div>
                                {this.state.statusList.map((status) =>
                                    <div>
                                    {status.Id?
                                        <div>
                                            <Checkbox
                                                label={status.Title}
                                                checked = {this.state.StatusSelecionados.includes(status.Id)}
                                                defaultChecked={false}
                                                onChange={(element,checked) => this._changeCheckBox(status.Id,element,checked,"Status",status.Title)}
                                            />  
                                        </div> 
                                    :
                                    ""}
                                    </div>
                                )}
                            </div>
                            :
                            ""
                        }
                    </div>					
                </div>						
                <div className="tipo drp-filtro">
                    <div className="menu-visivel img">
                        <Icon iconName="CaretSolidDown" className="ms-IconExample" />  
                    </div>
                    <div className="menu-visivel lbl">
                        Tipo
                    </div>
                    <div className="sub-filtro">
                        {this.state.listaTipos
                            ?
                            <div>
                                {this.state.tipos.map((tipo) =>
                                    <div>
                                    {tipo.Id?
                                        <div>
                                            <Checkbox
                                                label={tipo.Title}
                                                checked = {this.state.tiposSelecionados.includes(tipo.Id)}
                                                defaultChecked={false}
                                                onChange={(element,checked) => this._changeCheckBox(tipo.Id,element,checked,"Tipo",tipo.Title)}
                                            />  
                                        </div> 
                                    :
                                    ""}
                                    </div>
                                )}
                            </div>
                            :
                            ""
                        }
                    </div>						
                </div>						
                <div className="time drp-filtro">
                    <div className="menu-visivel img">
                        <Icon iconName="CaretSolidDown" className="ms-IconExample" />  
                    </div>
                    <div className="menu-visivel lbl">
                        Time
                    </div>
                    <div className="sub-filtro">
                        {this.state.listaTimes
                            ?
                            <div>
                                {this.state.times.map((time) =>
                                    <div>
                                    {time.Id?
                                        <div>
                                            <Checkbox
                                                label={time.Title}
                                                checked = {this.state.timesSelecionados.includes(time.Id)}
                                                defaultChecked={false}
                                                onChange={(element,checked) => this._changeCheckBox(time.Id,element,checked,"Time",time.Title)}
                                            />  
                                        </div> 
                                    :
                                    ""}
                                    </div>
                                )}
                            </div>
                            :
                            ""
                        }
                    </div>							
                </div>						
                <div className="texto drp-filtro">
                <TooltipHost content="Responsável TI" id="Descritivo" calloutProps={{ gapSpace: 0 }}>
                    <div className="filtro-texto">
                        <div className="image">
                            <Icon iconName="People" className="ms-IconExample" />  
                        </div>
                        <div className="input">
                            {this.state.showUserFieldTI?
                                <Usuarios
                                    itemLimit={1}
                                    siteUrl={this.props.siteUrl}
                                    siteUrlPicker={this.props.siteUrlPicker}
                                    spHttpClient={this.props.spHttpClient}
                                    typePicker={"normal"}
                                    principalTypeUser={true}
                                    principalTypeSharePointGroup={null}
                                    principalTypeSecurityGroup={null}
                                    principalTypeDistributionList={null}
                                    numberOfItems={15}
                                    _getidUser={(people) => this._handleSelection("ResponsavelTI", people)}
                                />
                            :""}

                        </div>								
                    </div>
                    </TooltipHost>
                </div>
                <div className="texto drp-filtro">
                <TooltipHost content="Participante" id="Descritivo" calloutProps={{ gapSpace: 0 }}>
                    <div className="filtro-texto">
                        <div className="image">
                            <Icon iconName="People" className="ms-IconExample" />  
                        </div>
                        <div className="input">
                            {this.state.showUserField?
                                <Usuarios
                                    itemLimit={1}
                                    siteUrl={this.props.siteUrl}
                                    siteUrlPicker={this.props.siteUrlPicker}
                                    spHttpClient={this.props.spHttpClient}
                                    typePicker={"normal"}
                                    principalTypeUser={true}
                                    principalTypeSharePointGroup={null}
                                    principalTypeSecurityGroup={null}
                                    principalTypeDistributionList={null}
                                    numberOfItems={15}
                                    _getidUser={(people) => this._handleSelection("Participante", people)}
                                />
                            :""}

                        </div>								
                    </div>
                    </TooltipHost>
                </div>
                <div className="texto drp-filtro">
                    <div className="filtro-texto">
                        <div className="image">
                            <Icon iconName="Search" className="ms-IconExample" />  
                        </div>
                        <div className="input">
                            <TextField
                                required={false}
                                placeholder="Título..."
                                value={this.state.textoSelecionado}
                                onChanged={(e) => this._handleSelection("TitleText",e)}
                            />                            
                        </div>								
                    </div>
                </div>					
            </div>
            {this.state.titleOrIdText.length > 0 || 
                this.state.pessoaText.length > 0 || 
                this.state.participanteText.length > 0 || 
                this.state.relevanciaText.length > 0 || 
                this.state.tipoText.length > 0 || 
                this.state.statusText.length > 0 || 
                this.state.timeText.length > 0 ||
                this.state.favoritosIds.length > 0 
                ?
                <Subfiltro
                    titleOrIdText={this.state.titleOrIdText}
                    pessoaText={this.state.pessoaText}
                    participanteText={this.state.participanteText}
                    relevanciaText={this.state.relevanciaText}
                    tipoText={this.state.tipoText}
                    statusText={this.state.statusText}
                    timeText={this.state.timeText}
                    removeFiltro={(regId,tipo,add,regText) => this.removeFiltro(regId,tipo,add,regText)}
                    salvaFiltro={(nomeFiltro) => this.salvaFiltro(nomeFiltro)}
                    salvaEditado={() => this.salvaEditado()}
                    excluirFiltro={() => this.excluirFiltro()}
                    limpaFiltro={() => this.limpaFiltro()}
                    favoritosIds={ this.state.favoritosIds}
                    IDFiltroEscolhido={this.state.IDFiltroEscolhido}
                    mensagemSalvafiltroErro={this.state.mensagemSalvafiltroErro}
                    
                />
    
                :
                ""
            }


{this.state.exibemsgSucesso?
    <div className="messageBarShare">

    <MessageBar messageBarType={MessageBarType.success}>
        Ação realizada com sucesso.
    </MessageBar>
    </div>

    :""
}

</div>

        )
    }
}
export default Filtro;