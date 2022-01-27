import Comentarios from '../Comentarios Form/Comentarios'
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Shimmer, ShimmerElementType as ElemType } from 'office-ui-fabric-react/lib/Shimmer';
import { DatePicker, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import Usuarios from '../Usuarios/Usuarios';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import "./formcss.css";
import {
    postAtividades,

    gravaComentarios,
    getToken,
    getLookUp,
    delArquivos,
    getProjetos,
    getMyTeams,
    postTracking,
    getArquivos,
    getItemByfilter
} from '../../services';
let arquivo = [];
let arq: any;
const DayPickerStrings: IDatePickerStrings = {
    months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
    shortDays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    goToToday: 'Selecionar hoje',
    prevMonthAriaLabel: 'Mês anterior',
    nextMonthAriaLabel: 'Proxímo mês',
    prevYearAriaLabel: 'Ano anterior',
    nextYearAriaLabel: 'Proxímo ano'
};
class FormTimeParametrizado extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
            disableBTN: false,
            nivelUsuario: this.props.nivelUsuario,
            showPanel: true,
            demandaid: this.props.demandaid,
            projeto: this.props.projeto,
            buttonSave: false,
            titulo: this.props.titulo,
            AprovadorEmail: this.props.AprovadorEmail,
            hideDialog: true,
            relacionadasID: this.props.relacionadas,
            prioridadeChecked: this.props.prioridade != null ? true : false,
            veriFoneChecked: this.props.veriFone != null ? true : false,
            volumeChecked: this.props.volume != null ? true : false,
            estimativaVeriFoneChecked: this.props.estimativaVeriFone != null ? true : false,
            impactoChecked: this.props.impacto != null ? true : false,
            blocoSprintChecked: this.props.blocoSprint != null ? true : false,
            efetuadoReviewChecked: this.props.efetuadoReview != null ? true : false,
            validadoEntregaChecked: this.props.validadoEntrega != null ? true : false,
            gerouBugChecked: this.props.gerouBug != null ? true : false,
            JIRAChecked: this.props.JIRA != null ? true : false,
            horasChecked: this.props.Horas != null ? true : false,
            tamanhoDemandaChecked: this.props.tamanhoDemanda != null ? true : false,
            RFCChecked: this.props.RFC != null ? true : false,
            requestsSAPChecked: this.props.requestsSAP != null ? true : false,
            comentariosTecnicosChecked: this.props.comentariosTecnicos != null ? true : false,
            componentes: [],
            componentesOnApply: [],
            isCalloutVisible: false,
            beneficio: this.props.beneficio,
            descritivo: this.props.descritivo,
            timeid: this.props.time,
            projetoid: this.props.projeto,
            statusid: this.props.status,
            statusName: this.props.statusName,
            relevanciaid: this.props.relevancia,
            tipoid: this.props.tipo,
            areasolicitante: this.props.areasolicitante,
            fornecedorid: this.props.fornecedor,
            empresaid: this.props.empresa,
            demandakey: this.props.demanda,
            comentarios: this.props.comentarios,
            requestSAP: this.props.requestSAP,
            responsavelareaid: this.props.selecionadoAreaId,
            responsaveltiid: this.props.selecionadoTIId,
            dtprevinicio: this.props.dtprevinicio,
            dtprevfim: this.props.dtprevfim,
            dtinicio: this.props.dtinicio,
            jira: this.props.jira,
            dtfim: this.props.dtfim,
            numeroRFC: this.props.numeroRFC,
            errorMsg: '',
            timedropDown: false,
            prioridade: this.props.prioridade,
            veriFone: this.props.veriFone,
            volume: this.props.volume,
            estimativaVeriFone: this.props.estimativaVeriFone,
            impacto: this.props.impacto,
            blocoSprint: this.props.blocoSprint,
            efetuadoReview: this.props.efetuadoReview,
            validadoEntrega: this.props.validadoEntrega,
            gerouBug: this.props.gerouBug,
            comentariosTecnicos: this.props.comentariosTecnicos,
            demandaRelacionada: this.props.demandaRelacionada,
            relacionadoid: this.props.demandaRelacionadaId,
            relacionamento: false,
            participantesId: this.props.participantesId,
            participantes: this.props.participantes,
            Horas: this.props.Horas,
			TamanhoDemanda: this.props.TamanhoDemanda,
            listaProjetos: false,
            fornecedorRequired: false,
            blocoSprintCheckedObrigatorio: false,
            comentariosTecnicosCheckedObrigatorio: false,
            efetuadoReviewCheckedObrigatorio: false,
            estimativaVeriFoneCheckedObrigatorio: false,
            gerouBugCheckedObrigatorio: false,
            impactoCheckedObrigatorio: false,
            JIRACheckedObrigatorio: false,
            horasCheckedObrigatorio: false,
            tamanhoDemandaCheckedObrigatorio: false,
            prioridadeCheckedObrigatorio: false,
            requestsSAPCheckedObrigatorio: false,
            RFCCheckedObrigatorio: false,
            validadoEntregaCheckedObrigatorio: false,
            veriFoneCheckedObrigatorio: false,
            volumeCheckedObrigatorio: false,
            ParticipantesCheckedObrigatorio: false,
            FornecedorCheckedObrigatorio: false,
            RelacionadoCheckedObrigatorio: false,
            ProjetoCheckedObrigatorio: false,
        }
    }
    readUploadedFileAsText = inputFile => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                let x = resolve(reader.result);
            };
            reader.readAsArrayBuffer(inputFile);
        });
    };
    uploadFile = async event => {
        event.preventDefault();
        if (!event.target || !event.target.files) {
            return;
        }
        this.setState({ waitingForFileUpload: true });
        const fileList = event.target.files;
        // Uploads will push to the file input's `.files` array. Get the last uploaded file.
        const latestUploadedFile = fileList.item(fileList.length - 1);
        try {
            const fileContents = await this.readUploadedFileAsText(latestUploadedFile);
            this.setState({
                uploadedFileContents: fileContents,
                fileName: latestUploadedFile.name,
                waitingForFileUpload: false,
            }, () => this._arquivos(this.state.uploadedFileContents, this.state.fileName));
        } catch (e) {
            this.setState({
                waitingForFileUpload: false
            });
        }
    };

    _arquivos = (arq, fname) => {
        arquivo.push({ nome: fname, byteBuffer: arq })
        this.setState({ arquivo: arquivo })
    }

    exibeComentario = (id) => {
        if (this.state.idProjeto == id) {
            if (this.state.mostraComentario)
                this.setState({ mostraComentario: false, idProjeto: id });
            else
                this.setState({ mostraComentario: true, idProjeto: id });
        }
        else {
            this.setState({ mostraComentario: true, idProjeto: id });
        }
    }
    _delArquivos = (url, id, filename, key) => {
        delete arq[key];
        this.setState({ arq: null })
        delArquivos(url, id, filename).then(data => {
            this.setState({ arq: arq })
        });
    }
    _delLocalArquivos = (k) => {
        delete arquivo[k];
        this.setState({ arquivo: arquivo })
    }


    private _onParseDateFromString = (value: string, mydate: Date): Date => {
        const date = mydate || new Date();
        const values = (value || '').trim().split('/');
        const day = values.length > 0 ? Math.max(1, Math.min(31, parseInt(values[0], 10))) : date.getDate();
        const month = values.length > 1 ? Math.max(1, Math.min(12, parseInt(values[1], 10))) - 1 : date.getMonth();
        let year = values.length > 2 ? parseInt(values[2], 10) : date.getFullYear();
        if (year < 100) {
            year += date.getFullYear() - (date.getFullYear() % 100);
        }
        return new Date(year, month, day);
    };
    private _onFormatDate = (date: Date): string => {

        return ('0' + date.getDate().toString()).slice(-2) + '/'
            + ('0' + (date.getMonth() + 1).toString()).slice(-2) + '/'
            + date.getFullYear();
    };
    private loadLookup = (nivel): void => {
        getMyTeams(this.props.siteUrl).then(retorno => {
            this.setState({ times: retorno, listaTimes: true });
            let filtroMeusTimes = "(TimeId eq " + this.state.timeid + ")";
            let demandaRelacionadaID = this.state.relacionadoid;
            getLookUp(this.props.siteUrl, "ControleDemandas", "Title", "&$filter=" + filtroMeusTimes).then(retorno => {
                this.setState({ relacionadas: retorno }, () => setTimeout(() => demandaRelacionadaID > 0 ? this.setState({ relacionamento: true }) : this.setState({ relacionamento: false }), 300))
            })
        })
        getLookUp(this.props.siteUrl, "Status", "Ordem", "").then(retorno => {
            this.setState({ statusList: retorno });
        })
        if (this.state.demandaid > 0) {
            let time = []
            time.push({ "Id": [this.state.timeid] })
            getProjetos(this.props.siteUrl, "Projeto", "Title", time).then(retorno => {

                this.setState({ projetos: retorno, listaProjetos: true });
            })
        }
        else {
            this.setState({ listaProjetos: true });
        }
        // getLookUp(this.props.siteUrl,"Projeto","Title")
        getLookUp(this.props.siteUrl, "TipoDemanda", "Title", "").then(retorno => {
            this.setState({ tipos: retorno, tiposLista: true });
        })
        getLookUp(this.props.siteUrl, "Fornecedores", "Title", "").then(retorno => {
            this.setState({ fornecedores: retorno, listaFornecedores: true });
        })

        getLookUp(this.props.siteUrl, "Empresa", "Title", "").then(retorno => {
            this.setState({ empresas: retorno, empresasLista: true });
        })

    }
    private ResetFields = () => {
        
        this.setState({ blocoSprintChecked: false });
        this.setState({ comentariosTecnicosChecked: false });
        this.setState({ efetuadoReviewChecked: false });
        this.setState({ estimativaVeriFoneChecked: false });
        this.setState({ gerouBugChecked: false });
        this.setState({ impactoChecked: false });
        this.setState({ JIRAChecked: false });

        this.setState({ horasChecked: false });
        this.setState({ tamanhoDemandaChecked: false });

        this.setState({ prioridadeChecked: false });
        this.setState({ requestsSAPChecked: false });
        this.setState({ RFCChecked: false });
        this.setState({ validadoEntregaChecked: false });
        this.setState({ veriFoneChecked: false });
        this.setState({ volumeChecked: false });
        this.setState({ ParticipantesChecked: false });
        this.setState({ FornecedorChecked: false });
        this.setState({ RelacionadoChecked: false });
        this.setState({ ProjetoChecked: false });

        this.setState({ blocoSprintCheckedObrigatorio: false });
        this.setState({ comentariosTecnicosCheckedObrigatorio: false });
        this.setState({ efetuadoReviewCheckedObrigatorio: false });
        this.setState({ estimativaVeriFoneCheckedObrigatorio: false });
        this.setState({ gerouBugCheckedObrigatorio: false });
        this.setState({ impactoCheckedObrigatorio: false });
        this.setState({ JIRACheckedObrigatorio: false });

        this.setState({ tamanhoDemandaCheckedObrigatorio: false });
        this.setState({ horasCheckedObrigatorio: false });


        this.setState({ prioridadeCheckedObrigatorio: false });
        this.setState({ requestsSAPCheckedObrigatorio: false });
        this.setState({ RFCCheckedObrigatorio: false });
        this.setState({ validadoEntregaCheckedObrigatorio: false });
        this.setState({ veriFoneCheckedObrigatorio: false });
        this.setState({ volumeCheckedObrigatorio: false });
        this.setState({ ParticipantesCheckedObrigatorio: false });
        this.setState({ FornecedorCheckedObrigatorio: false });
        this.setState({ RelacionadoCheckedObrigatorio: false });
        this.setState({ ProjetoCheckedObrigatorio: false });
    }
    private buildFields = (retornoConsulta) => {
        this.ResetFields();
        if (retornoConsulta.blocoSprint != "false") {
            this.setState({ blocoSprintChecked: true });
            if (retornoConsulta.blocoSprint == "Obrigatorio") {
                this.setState({ blocoSprintCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.comentariosTecnicos != "false") {
            this.setState({ comentariosTecnicosChecked: true });
            if (retornoConsulta.comentariosTecnicos == "Obrigatorio") {
                this.setState({ comentariosTecnicosCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.efetuadoReview != "false") {
            this.setState({ efetuadoReviewChecked: true });
            if (retornoConsulta.efetuadoReview == "Obrigatorio") {
                this.setState({ efetuadoReviewCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.estimativaVeriFone != "false") {
            this.setState({ estimativaVeriFoneChecked: true });
            if (retornoConsulta.estimativaVeriFone == "Obrigatorio") {
                this.setState({ estimativaVeriFoneCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.gerouBug != "false") {
            this.setState({ gerouBugChecked: true });
            if (retornoConsulta.gerouBug == "Obrigatorio") {
                this.setState({ gerouBugCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.impacto != "false") {
            this.setState({ impactoChecked: true });
            if (retornoConsulta.impacto == "Obrigatorio") {
                this.setState({ impactoCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.JIRA != "false") {
            this.setState({ JIRAChecked: true });
            if (retornoConsulta.JIRA == "Obrigatorio") {
                this.setState({ JIRACheckedObrigatorio: true });
            }
        }




        if (retornoConsulta.TamanhoDemanda != "false") {
            this.setState({ tamanhoDemandaChecked: true });
            if (retornoConsulta.TamanhoDemanda == "Obrigatorio") {
                this.setState({ tamanhoDemandaCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.Horas != "false") {
            this.setState({ horasChecked: true });
            if (retornoConsulta.Horas == "Obrigatorio") {
                this.setState({ horasCheckedObrigatorio: true });
            }
        }



        if (retornoConsulta.prioridade != "false") {
            this.setState({ prioridadeChecked: true });
            if (retornoConsulta.prioridade == "Obrigatorio") {
                this.setState({ prioridadeCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.requestsSAP != "false") {
            this.setState({ requestsSAPChecked: true });
            if (retornoConsulta.requestsSAP == "Obrigatorio") {
                this.setState({ requestsSAPCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.RFC != "false") {
            this.setState({ RFCChecked: true });
            if (retornoConsulta.RFC == "Obrigatorio") {
                this.setState({ RFCCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.validadoEntrega != "false") {
            this.setState({ validadoEntregaChecked: true });
            if (retornoConsulta.validadoEntrega == "Obrigatorio") {
                this.setState({ validadoEntregaCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.veriFone != "false") {
            this.setState({ veriFoneChecked: true });
            if (retornoConsulta.veriFone == "Obrigatorio") {
                this.setState({ veriFoneCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.volume != "false") {
            this.setState({ volumeChecked: true });
            if (retornoConsulta.volume == "Obrigatorio") {
                this.setState({ volumeCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.Participantes != "false") {
            this.setState({ ParticipantesChecked: true });
            if (retornoConsulta.Participantes == "Obrigatorio") {
                this.setState({ ParticipantesCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.Fornecedor != "false") {
            this.setState({ FornecedorChecked: true });
            if (retornoConsulta.Fornecedor == "Obrigatorio") {
                this.setState({ FornecedorCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.Relacionado != "false") {
            this.setState({ RelacionadoChecked: true });
            if (retornoConsulta.Relacionado == "Obrigatorio") {
                this.setState({ RelacionadoCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.Projeto != "false") {
            this.setState({ ProjetoChecked: true });
            if (retornoConsulta.Projeto == "Obrigatorio") {
                this.setState({ ProjetoCheckedObrigatorio: true });
            }
        }
    }


    // buildDynamicFields(){
    //     let arrSP= [];

    //     if(this.props.prioridade !=  null){arrSP.push({key:1, text:'prioridade'});}
    //     if(this.props.veriFone !=  null){arrSP.push({key:1, text:'veriFone'});}
    //     if(this.props.volume !=  null){arrSP.push({key:1, text:'volume'});}
    //     if(this.props.estimativaVeriFone !=  null){arrSP.push({key:1, text:'estimativaVeriFone'});}
    //     if(this.props.impacto !=  null){arrSP.push({key:1, text:'impacto'});}
    //     if(this.props.blocoSprint !=  null){arrSP.push({key:1, text:'blocoSprint'});}
    //     if(this.props.efetuadoReview !=  null){arrSP.push({key:1, text:'efetuadoReview'});}
    //     if(this.props.validadoEntrega !=  null){arrSP.push({key:1, text:'validadoEntrega'});}
    //     if(this.props.gerouBug !=  null){arrSP.push({key:1, text:'gerouBug'});}
    //     if(this.props.comentariosTecnicos !=  null){arrSP.push({key:0, text:'comentariosTecnicos'});}
    //     if(this.props.jira !=  null){arrSP.push({key:1, text:'JIRA'});}
    //     if(this.props.numeroRFC !=  null){arrSP.push({key:1, text:'RFC'});}
    //     if(this.props.requestSAP !=  null){arrSP.push({key:0, text:'requestsSAP'});}


    //     arrSP = arrSP.sort(function(a, b) {
    //         return b.key - a.key;
    //     });

    //     this.setState({ componentes: arrSP});
    //     this.setState({ componentesOnApply: arrSP});
    // }
    componentDidMount() {
        this.loadLookup(this.state.nivelUsuario);
        if (this.state.demandaid > 0) {
            getArquivos(this.props.siteUrl, this.state.demandaid).then(data => {
                arq = data;
                this.setState({ arq: arq })
            });
            getItemByfilter("?$filter=timeId eq " + this.state.timeid, this.props.siteUrl, "CamposPadraoPorTime")
                .then(data => {
                    this.setState({ CamposPadraoPorTime: data });
                    if (this.state.CamposPadraoPorTime.length > 0) {
                        this.setState({ registroID: this.state.CamposPadraoPorTime[0].ID });
                        this.buildFields(this.state.CamposPadraoPorTime[0]);
                    }
                    else {
                        this.setState({ registroID: 0 })
                        this.ResetFields();
                    }
                })

        }
        if (this.state.demandakey != "Interna" && this.state.demandakey != undefined)
            this.setState({ fornecedorRequired: true })
        else
            this.setState({ fornecedorRequired: false })

        //this.buildDynamicFields();
    }
    private _closePanel = (): void => {
        arquivo = [];
        this.props._atualiza();
    };
    _getResponsavelareaid(id) {
        if (id.length > 0) {
            this.setState({ responsavelareaid: id[0].User.Id })
        }
        else {
            this.setState({ responsavelareaid: null })
        }
    }
    _getResponsaveltiid(id) {
        if (id.length > 0) {
            this.setState({ responsaveltiid: id[0].User.Id })
        }
        else {
            this.setState({ responsaveltiid: null })
        }
    }
    _getParticipantesid(id) {
        if (id.length > 0) {
            let itens = [];
            id.map((mapRetornoItem) => {
                if (mapRetornoItem.key) {
                    itens.push(mapRetornoItem.key)
                }
                else {
                    itens.push(mapRetornoItem._user.Id)
                }
            })
            this.setState({ participantesId: itens })
        }
        else {
            this.setState({ participantesId: null })
        }
    }
    private _salvaDemanda = (): void => {
        this.setState({ disableBTN: true });
        if (this._verificaForm()) {
            this.setState({ disableBTN: false });
            return;
        }

        let dadosForm = {
            Title: this.state.titulo,
            BeneficioProjeto: this.state.beneficio,
            Descritivo: this.state.descritivo,
            TimeId: parseInt(this.state.timeid),
            ProjetoId: parseInt(this.state.projetoid),
            StatusId: parseInt(this.state.statusid),
            Relevancia: this.state.relevanciaid,
            TipoDemandaId: parseInt(this.state.tipoid),
            AreaSolicitante: this.state.areasolicitante,
            FornecedorId: parseInt(this.state.fornecedorid),
            Demanda: this.state.demandakey,
            //   Comentarios:"",//this.state.comentarios,
            RequestSAP: this.state.requestSAP,
            EmpresaId: parseInt(this.state.empresaid),
            ResponsavelAreaId: this.state.responsavelareaid,
            ResponsavelTIId: this.state.responsaveltiid,
            DataInicioEstimado: this.state.dtprevinicio,
            DataFimEstimada: this.state.dtprevfim,
            DataInicioReal: this.state.dtinicio,
            JIRA: this.state.jira,
            DataFimReal: this.state.dtfim,
            RFC: this.state.numeroRFC,
            prioridade: this.state.prioridade,
            veriFone: this.state.veriFone,
            volume: this.state.volume,
            estimativaVeriFone: this.state.estimativaVeriFone,
            impacto: this.state.impacto,
            blocoSprint: this.state.blocoSprint,
            efetuadoReview: this.state.efetuadoReview,
            validadoEntrega: this.state.validadoEntrega,
            gerouBug: this.state.gerouBug,
            comentariosTecnicos: this.state.comentariosTecnicos,
            demandaRelacionadaId: this.state.relacionadoid,
            participantesId: this.state.participantesId != null ? this.state.participantesId : [],
            TamanhoDemanda:this.state.TamanhoDemanda,
            Horas:this.state.Horas,

        }
        getToken(this.props.siteUrl).then(token => {
            //valida se o status mudou
            if (this.state.statusid != this.props.status && this.props.status != undefined) {
                let dadosTracking = {
                    DemandaId: parseInt(this.state.demandaid),
                    StatusId: parseInt(this.state.statusid),
                    StatusAntigoId: parseInt(this.props.status),
                    Title: this.state.demandaid.toString(),
                    NomeDemanda: this.state.titulo,
                }
                postTracking(this.props.siteUrl, dadosTracking, this.state.demandaid, this.state.arquivo, token)
                    .then(data => {
                        this._closePanel();
                    })
            }
            postAtividades(this.props.siteUrl, dadosForm, this.state.demandaid, this.state.arquivo, token)
                .then(data => {
                    this.setState({ itemPostado: data })
                    let itemID;

                    if (this.state.demandaid > 0)
                        itemID = this.state.demandaid;
                    else
                        itemID = this.state.itemPostado.data.Id;

                    let comentarios = {
                        Title: itemID.toString(),
                        Comentario: this.state.comentarios
                    }
                    if (this.state.comentarios != "" && this.state.comentarios != null) {
                        gravaComentarios(this.props.siteUrl, comentarios)
                            .then(dataComments => {
                                this._closePanel();
                            })
                    }
                    else {
                        this._closePanel()

                    }
                })
        })
    }
    _validaObrigatoriedadeDataAndamento = () => {
        if (this.state.statusName !== undefined) {
            if (this.state.statusName.Title.toUpperCase() == "EM ANDAMENTO") {
                this.setState({ estimativaObrigatoria: true })
                return true
            }
            else {
                this.setState({ estimativaObrigatoria: false })
                return false
            }
        }
    }
    _validaObrigatoriedadeDataEntregue = () => {
        if (this.state.statusName !== undefined) {
            if (this.state.statusName.Title.toUpperCase() == "ENTREGUE") {
                this.setState({ estimativaObrigatoriaEntregue: true })
                return true
            }
            else {
                this.setState({ estimativaObrigatoriaEntregue: false })
                return false
            }
        }
    }
    changeDemanda(value) {
        this.setState({ demanda: value }, () => { this.setState({ demandakey: this.state.demanda.key }) })

        if (value.text != "Interna")
            this.setState({ fornecedorRequired: true })
        else
            this.setState({ fornecedorRequired: false })
    }

    _verificaForm = () => {
        debugger
        if (this._validaObrigatoriedadeDataEntregue()) {
            if (
                (this._validaObrigatoriedadeDataEntregue() && this.state.dtfim != undefined) &&
                this.state.titulo != undefined && this.state.titulo != "" &&
                this.state.beneficio != undefined && this.state.beneficio != "" &&
                this.state.descritivo != undefined && this.state.descritivo != "" &&
                this.state.timeid != undefined &&
                this.state.demandakey != undefined &&
                (this.state.fornecedorRequired == false || (this.state.fornecedorid != undefined && this.state.fornecedorid != "")) &&
                this.state.relevanciaid != undefined &&
                this.state.tipoid != undefined &&
                this.state.statusid != undefined &&
                this.state.responsavelareaid != undefined && this.state.responsavelareaid > 0 &&
                this.state.responsaveltiid != undefined && this.state.responsaveltiid > 0 &&
                this.state.empresaid != "" &&
                this.state.empresaid != undefined &&
                this.state.areasolicitante != undefined && this.state.areasolicitante != ""


                && ((this.state.blocoSprint != undefined && this.state.blocoSprint != "") || this.state.blocoSprintCheckedObrigatorio == false)
                && ((this.state.comentariosTecnicos != undefined && this.state.comentariosTecnicos != "") || this.state.comentariosTecnicosCheckedObrigatorio == false)
                && ((this.state.efetuadoReview != undefined && this.state.efetuadoReview != "") || this.state.efetuadoReviewCheckedObrigatorio == false)
                && ((this.state.estimativaVeriFone != undefined && this.state.estimativaVeriFone != "") || this.state.estimativaVeriFoneCheckedObrigatorio == false)
                && ((this.state.gerouBug != undefined && this.state.gerouBug != "") || this.state.gerouBugCheckedObrigatorio == false)
                && ((this.state.impacto != undefined && this.state.impacto != "") || this.state.impactoCheckedObrigatorio == false)
                && ((this.state.jira != undefined && this.state.jira != "") || this.state.JIRACheckedObrigatorio == false)

                && ((this.state.Horas != undefined && this.state.Horas != "") || this.state.horasCheckedObrigatorio == false)
                && ((this.state.TamanhoDemanda != undefined && this.state.TamanhoDemanda != "") || this.state.tamanhoDemandaCheckedObrigatorio == false)

                && ((this.state.prioridade != undefined && this.state.prioridade != "") || this.state.prioridadeCheckedObrigatorio == false)
                && ((this.state.requestSAP != undefined && this.state.requestSAP != "") || this.state.requestsSAPCheckedObrigatorio == false)
                && ((this.state.numeroRFC != undefined && this.state.numeroRFC != "") || this.state.RFCCheckedObrigatorio == false)
                && ((this.state.validadoEntrega != undefined && this.state.validadoEntrega != "") || this.state.validadoEntregaCheckedObrigatorio == false)
                && ((this.state.veriFone != undefined && this.state.veriFone != "") || this.state.veriFoneCheckedObrigatorio == false)
                && ((this.state.volume != undefined && this.state.volume != "") || this.state.volumeCheckedObrigatorio == false)
                && ((this.state.projetoid != undefined && this.state.projetoid != "") || this.state.ProjetoCheckedObrigatorio == false)





            ) {
                this.setState({ buttonSave: false });
                return false;
            }
            else {
                let errorMsgTmp = '';
                if (this.state.titulo == undefined || this.state.titulo == "") { errorMsgTmp += 'Título, ' }
                if (this.state.beneficio == undefined || this.state.beneficio == "") { errorMsgTmp += 'Benefício, ' }
                if (this.state.descritivo == undefined || this.state.descritivo == "") { errorMsgTmp += 'Descritivo, ' }
                if (this.state.timeid == undefined) { errorMsgTmp += 'Time, ' }
                if (this.state.demandakey == undefined) { errorMsgTmp += 'Demanda, ' }

                if ((this.state.fornecedorid == undefined || this.state.fornecedorid == "") && this.state.fornecedorRequired) { errorMsgTmp += 'Fornecedor, ' };
                if (this.state.relevanciaid == undefined) { errorMsgTmp += 'Relevância, ' }
                if (this.state.tipoid == undefined) { errorMsgTmp += 'Tipo, ' }
                if (this.state.statusid == undefined) { errorMsgTmp += 'Status, ' }
                if (this.state.responsavelareaid == undefined || this.state.responsavelareaid == 0) { errorMsgTmp += 'Responsável Solicitante, ' }
                if (this.state.responsaveltiid == undefined || this.state.responsaveltiid == 0) { errorMsgTmp += 'Responsável TI, ' }
                if (this.state.empresaid == undefined) { errorMsgTmp += 'Empresa, ' }
                if (this.state.empresaid == "") { errorMsgTmp += 'Empresa, ' }
                if (this._validaObrigatoriedadeDataAndamento()) {
                    if (this.state.dtprevinicio == undefined) { errorMsgTmp += 'Data Prevista Início, ' }
                    if (this.state.dtinicio == undefined) { errorMsgTmp += 'Data Início Real, ' }
                    if (this.state.dtprevfim == undefined) { errorMsgTmp += 'Data Prevista Final, ' }
                }
                if (this._validaObrigatoriedadeDataEntregue()) {
                    if (this.state.dtinicio == undefined) { errorMsgTmp += 'Data Término Real, ' }
                }
                if (this.state.areasolicitante == undefined || this.state.areasolicitante == "") { errorMsgTmp += 'Área Solicitante,' }

                if ((this.state.blocoSprint == undefined || this.state.blocoSprint == "") && this.state.blocoSprintCheckedObrigatorio == true) { errorMsgTmp += 'Bloco/Sprint, ' }
                if ((this.state.comentariosTecnicos == undefined || this.state.comentariosTecnicos == "") && this.state.comentariosTecnicosCheckedObrigatorio == true) { errorMsgTmp += 'Comentários Técnicos, ' }
                if ((this.state.efetuadoReview == undefined || this.state.efetuadoReview == "") && this.state.efetuadoReviewCheckedObrigatorio == true) { errorMsgTmp += 'Efetuado Review, ' }
                if ((this.state.estimativaVeriFone == undefined || this.state.estimativaVeriFone == "") && this.state.estimativaVeriFoneCheckedObrigatorio == true) { errorMsgTmp += 'Estimativa Veri Fone, ' }
                if ((this.state.gerouBug == undefined || this.state.gerouBug == "") && this.state.gerouBugCheckedObrigatorio == true) { errorMsgTmp += 'Gerou Bug, ' }
                if ((this.state.impacto == undefined || this.state.impacto == "") && this.state.impactoCheckedObrigatorio == true) { errorMsgTmp += 'Impacto, ' }
                if ((this.state.jira == undefined || this.state.jira == "") && this.state.JIRACheckedObrigatorio == true) { errorMsgTmp += 'Jira, ' }

                if ((this.state.Horas == undefined || this.state.Horas == "") && this.state.horasCheckedObrigatorio == true) { errorMsgTmp += 'Horas, ' }
                if ((this.state.TamanhoDemanda == undefined || this.state.TamanhoDemanda == "") && this.state.tamanhoDemandaCheckedObrigatorio == true) { errorMsgTmp += 'Tamanho da Demanda, ' }

                if ((this.state.prioridade == undefined || this.state.prioridade == "") && this.state.prioridadeCheckedObrigatorio == true) { errorMsgTmp += 'Prioridade, ' }
                if ((this.state.requestSAP == undefined || this.state.requestSAP == "") && this.state.requestsSAPCheckedObrigatorio == true) { errorMsgTmp += 'Request SAP, ' }
                if ((this.state.numeroRFC == undefined || this.state.numeroRFC == "") && this.state.RFCCheckedObrigatorio == true) { errorMsgTmp += 'RFC, ' }
                if ((this.state.validadoEntrega == undefined || this.state.validadoEntrega == "") && this.state.validadoEntregaCheckedObrigatorio == true) { errorMsgTmp += 'Validado Entrega, ' }
                if ((this.state.veriFone == undefined || this.state.veriFone == "") && this.state.veriFoneCheckedObrigatorio == true) { errorMsgTmp += 'Veri Fone, ' }
                if ((this.state.volume == undefined || this.state.volume == "") && this.state.volumeCheckedObrigatorio == true) { errorMsgTmp += 'Volume, ' }
                if ((this.state.projetoid == undefined || this.state.projetoid == "") && this.state.ProjetoCheckedObrigatorio == true) { errorMsgTmp += 'Projeto, ' }

                this.setState({ buttonSave: true, errorMsg: errorMsgTmp })
                return true;
            }
        }
        else if (this._validaObrigatoriedadeDataAndamento()) {
            if (
                (this._validaObrigatoriedadeDataAndamento() &&
                    this.state.tipoid != undefined &&
                    this.state.dtinicio != undefined &&
                    this.state.statusid != undefined) &&
                this.state.titulo != undefined && this.state.titulo != "" &&
                this.state.beneficio != undefined && this.state.beneficio != "" &&
                this.state.descritivo != undefined && this.state.descritivo != "" &&
                this.state.timeid != undefined &&
                this.state.demandakey != undefined &&
                (this.state.fornecedorRequired == false || (this.state.fornecedorid != undefined && this.state.fornecedorid != "")) &&
                this.state.relevanciaid != undefined &&
                this.state.tipoid != undefined &&
                this.state.statusid != undefined &&
                this.state.responsavelareaid != undefined && this.state.responsavelareaid > 0 &&
                this.state.responsaveltiid != undefined && this.state.responsaveltiid > 0 &&
                this.state.empresaid != "" &&
                this.state.empresaid != undefined &&
                this.state.areasolicitante != undefined && this.state.areasolicitante != ""
                && ((this.state.blocoSprint != undefined && this.state.blocoSprint != "") || this.state.blocoSprintCheckedObrigatorio == false)
                && ((this.state.comentariosTecnicos != undefined && this.state.comentariosTecnicos != "") || this.state.comentariosTecnicosCheckedObrigatorio == false)
                && ((this.state.efetuadoReview != undefined && this.state.efetuadoReview != "") || this.state.efetuadoReviewCheckedObrigatorio == false)
                && ((this.state.estimativaVeriFone != undefined && this.state.estimativaVeriFone != "") || this.state.estimativaVeriFoneCheckedObrigatorio == false)
                && ((this.state.gerouBug != undefined && this.state.gerouBug != "") || this.state.gerouBugCheckedObrigatorio == false)
                && ((this.state.impacto != undefined && this.state.impacto != "") || this.state.impactoCheckedObrigatorio == false)
                && ((this.state.jira != undefined && this.state.jira != "") || this.state.JIRACheckedObrigatorio == false)

                && ((this.state.Horas != undefined && this.state.Horas != "") || this.state.horasCheckedObrigatorio == false)
                && ((this.state.TamanhoDemanda != undefined && this.state.TamanhoDemanda != "") || this.state.tamanhoDemandaCheckedObrigatorio == false)

                && ((this.state.prioridade != undefined && this.state.prioridade != "") || this.state.prioridadeCheckedObrigatorio == false)
                && ((this.state.requestSAP != undefined && this.state.requestSAP != "") || this.state.requestsSAPCheckedObrigatorio == false)
                && ((this.state.numeroRFC != undefined && this.state.numeroRFC != "") || this.state.RFCCheckedObrigatorio == false)
                && ((this.state.validadoEntrega != undefined && this.state.validadoEntrega != "") || this.state.validadoEntregaCheckedObrigatorio == false)
                && ((this.state.veriFone != undefined && this.state.veriFone != "") || this.state.veriFoneCheckedObrigatorio == false)
                && ((this.state.volume != undefined && this.state.volume != "") || this.state.volumeCheckedObrigatorio == false)
                && ((this.state.projetoid != undefined && this.state.projetoid != "") || this.state.ProjetoCheckedObrigatorio == false)

            ) {
                this.setState({ buttonSave: false });
                return false;
            }
            else {
                let errorMsgTmp = '';
                if (this.state.titulo == undefined || this.state.titulo == "") { errorMsgTmp += 'Título, ' };
                if (this.state.beneficio == undefined || this.state.beneficio == "") { errorMsgTmp += 'Benefício, ' };
                if (this.state.descritivo == undefined || this.state.descritivo == "") { errorMsgTmp += 'Descritivo, ' };
                if (this.state.timeid == undefined) { errorMsgTmp += 'Time, ' };
                if (this.state.demandakey == undefined) { errorMsgTmp += 'Demanda, ' };
                if ((this.state.fornecedorid == undefined || this.state.fornecedorid == "") && this.state.fornecedorRequired) { errorMsgTmp += 'Fornecedor, ' };
                if (this.state.relevanciaid == undefined) { errorMsgTmp += 'Relevância, ' };
                if (this.state.tipoid == undefined) { errorMsgTmp += 'Tipo, ' };
                if (this.state.statusid == undefined) { errorMsgTmp += 'Status, ' };
                if (this.state.responsavelareaid == undefined || this.state.responsavelareaid == 0) { errorMsgTmp += 'Responsável Solicitante, ' };
                if (this.state.responsaveltiid == undefined || this.state.responsaveltiid == 0) { errorMsgTmp += 'Responsável TI, ' };
                if (this.state.empresaid == undefined) { errorMsgTmp += 'Empresa, ' };
                if (this.state.empresaid == "") { errorMsgTmp += 'Empresa, ' }
                if (this._validaObrigatoriedadeDataAndamento()) {
                    if (this.state.dtprevinicio == undefined) { errorMsgTmp += 'Data Prevista Início, ' };
                    if (this.state.dtinicio == undefined) { errorMsgTmp += 'Data Início Real, ' };
                    if (this.state.dtprevfim == undefined) { errorMsgTmp += 'Data Prevista Final, ' };
                };
                if (this._validaObrigatoriedadeDataEntregue()) {
                    if (this.state.DataFimReal == undefined) { errorMsgTmp += 'Data Término Real, ' };
                };
                if (this.state.areasolicitante == undefined || this.state.areasolicitante == "") { errorMsgTmp += 'Área Solicitante,' };

                if ((this.state.blocoSprint == undefined || this.state.blocoSprint == "") && this.state.blocoSprintCheckedObrigatorio == true) { errorMsgTmp += 'Bloco/Sprint, ' }
                if ((this.state.comentariosTecnicos == undefined || this.state.comentariosTecnicos == "") && this.state.comentariosTecnicosCheckedObrigatorio == true) { errorMsgTmp += 'Comentários Técnicos, ' }
                if ((this.state.efetuadoReview == undefined || this.state.efetuadoReview == "") && this.state.efetuadoReviewCheckedObrigatorio == true) { errorMsgTmp += 'Efetuado Review, ' }
                if ((this.state.estimativaVeriFone == undefined || this.state.estimativaVeriFone == "") && this.state.estimativaVeriFoneCheckedObrigatorio == true) { errorMsgTmp += 'Estimativa Veri Fone, ' }
                if ((this.state.gerouBug == undefined || this.state.gerouBug == "") && this.state.gerouBugCheckedObrigatorio == true) { errorMsgTmp += 'Gerou Bug, ' }
                if ((this.state.impacto == undefined || this.state.impacto == "") && this.state.impactoCheckedObrigatorio == true) { errorMsgTmp += 'Impacto, ' }
                if ((this.state.jira == undefined || this.state.jira == "") && this.state.JIRACheckedObrigatorio == true) { errorMsgTmp += 'Jira, ' }

                if ((this.state.Horas == undefined || this.state.Horas == "") && this.state.horasCheckedObrigatorio == true) { errorMsgTmp += 'Horas, ' }
                if ((this.state.TamanhoDemanda == undefined || this.state.TamanhoDemanda == "") && this.state.tamanhoDemandaCheckedObrigatorio == true) { errorMsgTmp += 'Tamanho da Demanda, ' }

                if ((this.state.prioridade == undefined || this.state.prioridade == "") && this.state.prioridadeCheckedObrigatorio == true) { errorMsgTmp += 'Prioridade, ' }
                if ((this.state.requestSAP == undefined || this.state.requestSAP == "") && this.state.requestsSAPCheckedObrigatorio == true) { errorMsgTmp += 'Request SAP, ' }
                if ((this.state.numeroRFC == undefined || this.state.numeroRFC == "") && this.state.RFCCheckedObrigatorio == true) { errorMsgTmp += 'RFC, ' }
                if ((this.state.validadoEntrega == undefined || this.state.validadoEntrega == "") && this.state.validadoEntregaCheckedObrigatorio == true) { errorMsgTmp += 'Validado Entrega, ' }
                if ((this.state.veriFone == undefined || this.state.veriFone == "") && this.state.veriFoneCheckedObrigatorio == true) { errorMsgTmp += 'Veri Fone, ' }
                if ((this.state.volume == undefined || this.state.volume == "") && this.state.volumeCheckedObrigatorio == true) { errorMsgTmp += 'Volume, ' }
                if ((this.state.projetoid == undefined || this.state.projetoid == "") && this.state.ProjetoCheckedObrigatorio == true) { errorMsgTmp += 'Projeto, ' }

                this.setState({ buttonSave: true, errorMsg: errorMsgTmp });
                return true;
            }
        }
        else {
            if (
                this.state.titulo != undefined && this.state.titulo != "" &&
                this.state.beneficio != undefined && this.state.beneficio != "" &&
                this.state.descritivo != undefined && this.state.descritivo != "" &&
                this.state.timeid != undefined &&
                this.state.demandakey != undefined &&
                (this.state.fornecedorRequired == false || (this.state.fornecedorid != undefined && this.state.fornecedorid != "")) &&
                this.state.relevanciaid != undefined &&
                this.state.tipoid != undefined &&
                this.state.statusid != undefined &&
                this.state.responsavelareaid != undefined && this.state.responsavelareaid > 0 &&
                this.state.responsaveltiid != undefined && this.state.responsaveltiid > 0 &&
                this.state.empresaid != "" &&
                this.state.empresaid != undefined &&
                this.state.areasolicitante != undefined && this.state.areasolicitante != ""
                && ((this.state.blocoSprint != undefined && this.state.blocoSprint != "") || this.state.blocoSprintCheckedObrigatorio == false)
                && ((this.state.comentariosTecnicos != undefined && this.state.comentariosTecnicos != "") || this.state.comentariosTecnicosCheckedObrigatorio == false)
                && ((this.state.efetuadoReview != undefined && this.state.efetuadoReview != "") || this.state.efetuadoReviewCheckedObrigatorio == false)
                && ((this.state.estimativaVeriFone != undefined && this.state.estimativaVeriFone != "") || this.state.estimativaVeriFoneCheckedObrigatorio == false)
                && ((this.state.gerouBug != undefined && this.state.gerouBug != "") || this.state.gerouBugCheckedObrigatorio == false)
                && ((this.state.impacto != undefined && this.state.impacto != "") || this.state.impactoCheckedObrigatorio == false)
                && ((this.state.jira != undefined && this.state.jira != "") || this.state.JIRACheckedObrigatorio == false)

                && ((this.state.Horas != undefined && this.state.Horas != "") || this.state.horasCheckedObrigatorio == false)
                && ((this.state.TamanhoDemanda != undefined && this.state.TamanhoDemanda != "") || this.state.tamanhoDemandaCheckedObrigatorio == false)

                && ((this.state.prioridade != undefined && this.state.prioridade != "") || this.state.prioridadeCheckedObrigatorio == false)
                && ((this.state.requestSAP != undefined && this.state.requestSAP != "") || this.state.requestsSAPCheckedObrigatorio == false)
                && ((this.state.numeroRFC != undefined && this.state.numeroRFC != "") || this.state.RFCCheckedObrigatorio == false)
                && ((this.state.validadoEntrega != undefined && this.state.validadoEntrega != "") || this.state.validadoEntregaCheckedObrigatorio == false)
                && ((this.state.veriFone != undefined && this.state.veriFone != "") || this.state.veriFoneCheckedObrigatorio == false)
                && ((this.state.volume != undefined && this.state.volume != "") || this.state.volumeCheckedObrigatorio == false)
                && ((this.state.projetoid != undefined && this.state.projetoid != "") || this.state.ProjetoCheckedObrigatorio == false)

            ) {
                this.setState({ buttonSave: false });
                return false;
            }
            else {
                let errorMsgTmp = '';
                if (this.state.titulo == undefined || this.state.titulo == "") { errorMsgTmp += 'Título, ' }
                if (this.state.beneficio == undefined || this.state.beneficio == "") { errorMsgTmp += 'Benefício, ' }
                if (this.state.descritivo == undefined || this.state.descritivo == "") { errorMsgTmp += 'Descritivo, ' }
                if (this.state.timeid == undefined) { errorMsgTmp += 'Time, ' }
                if (this.state.demandakey == undefined) { errorMsgTmp += 'Demanda, ' }
                if ((this.state.fornecedorid == undefined || this.state.fornecedorid == "") && this.state.fornecedorRequired) { errorMsgTmp += 'Fornecedor, ' };
                if (this.state.relevanciaid == undefined) { errorMsgTmp += 'Relevância, ' }
                if (this.state.tipoid == undefined) { errorMsgTmp += 'Tipo, ' }
                if (this.state.statusid == undefined) { errorMsgTmp += 'Status, ' }
                if (this.state.responsavelareaid == undefined || this.state.responsavelareaid == 0) { errorMsgTmp += 'Responsável Solicitante, ' }
                if (this.state.responsaveltiid == undefined || this.state.responsaveltiid == 0) { errorMsgTmp += 'Responsável TI, ' }
                if (this.state.empresaid == undefined) { errorMsgTmp += 'Empresa, ' }
                if (this.state.empresaid == "") { errorMsgTmp += 'Empresa, ' }
                if (this._validaObrigatoriedadeDataAndamento()) {
                    if (this.state.dtprevinicio == undefined) { errorMsgTmp += 'Data Prevista Início, ' }
                    if (this.state.dtinicio == undefined) { errorMsgTmp += 'Data Início Real, ' }
                    if (this.state.dtprevfim == undefined) { errorMsgTmp += 'Data Prevista Final, ' }
                }
                if (this._validaObrigatoriedadeDataEntregue()) {
                    if (this.state.DataFimReal == undefined) { errorMsgTmp += 'Data Término Real, ' }
                }
                if (this.state.areasolicitante == undefined || this.state.areasolicitante == "") { errorMsgTmp += 'Área Solicitante,' }

                if ((this.state.blocoSprint == undefined || this.state.blocoSprint == "") && this.state.blocoSprintCheckedObrigatorio == true) { errorMsgTmp += 'Bloco/Sprint, ' }
                if ((this.state.comentariosTecnicos == undefined || this.state.comentariosTecnicos == "") && this.state.comentariosTecnicosCheckedObrigatorio == true) { errorMsgTmp += 'Comentários Técnicos, ' }
                if ((this.state.efetuadoReview == undefined || this.state.efetuadoReview == "") && this.state.efetuadoReviewCheckedObrigatorio == true) { errorMsgTmp += 'Efetuado Review, ' }
                if ((this.state.estimativaVeriFone == undefined || this.state.estimativaVeriFone == "") && this.state.estimativaVeriFoneCheckedObrigatorio == true) { errorMsgTmp += 'Estimativa Veri Fone, ' }
                if ((this.state.gerouBug == undefined || this.state.gerouBug == "") && this.state.gerouBugCheckedObrigatorio == true) { errorMsgTmp += 'Gerou Bug, ' }
                if ((this.state.impacto == undefined || this.state.impacto == "") && this.state.impactoCheckedObrigatorio == true) { errorMsgTmp += 'Impacto, ' }
                if ((this.state.jira == undefined || this.state.jira == "") && this.state.JIRACheckedObrigatorio == true) { errorMsgTmp += 'Jira, ' }

                if ((this.state.Horas == undefined || this.state.Horas == "") && this.state.horasCheckedObrigatorio == true) { errorMsgTmp += 'Horas, ' }
                if ((this.state.TamanhoDemanda == undefined || this.state.TamanhoDemanda == "") && this.state.tamanhoDemandaCheckedObrigatorio == true) { errorMsgTmp += 'Tamanho da Demanda, ' }

                if ((this.state.prioridade == undefined || this.state.prioridade == "") && this.state.prioridadeCheckedObrigatorio == true) { errorMsgTmp += 'Prioridade, ' }
                if ((this.state.requestSAP == undefined || this.state.requestSAP == "") && this.state.requestsSAPCheckedObrigatorio == true) { errorMsgTmp += 'Request SAP, ' }
                if ((this.state.numeroRFC == undefined || this.state.numeroRFC == "") && this.state.RFCCheckedObrigatorio == true) { errorMsgTmp += 'RFC, ' }
                if ((this.state.validadoEntrega == undefined || this.state.validadoEntrega == "") && this.state.validadoEntregaCheckedObrigatorio == true) { errorMsgTmp += 'Validado Entrega, ' }
                if ((this.state.veriFone == undefined || this.state.veriFone == "") && this.state.veriFoneCheckedObrigatorio == true) { errorMsgTmp += 'Veri Fone, ' }
                if ((this.state.volume == undefined || this.state.volume == "") && this.state.volumeCheckedObrigatorio == true) { errorMsgTmp += 'Volume, ' }
                if ((this.state.projetoid == undefined || this.state.projetoid == "") && this.state.ProjetoCheckedObrigatorio == true) { errorMsgTmp += 'Projeto, ' }

                this.setState({ buttonSave: true, errorMsg: errorMsgTmp })
                return true;
            }
        }
    }
    private changeTeam = (valueTeam) => {

        this.setState({ relacionadoid: 0 });

        this.setState({ time: valueTeam }, () => { this.setState({ timeid: this.state.time.Id }) })
        let team = [];

        this.setState({ listaProjetos: false });

        team.push(valueTeam);

        let teamId = []
        team.map(item => {
            teamId.push(item.Id)
        })
        let filtroMeusTimes = "(TimeId eq " + teamId.join(" or TimeId eq ") + ")"
        getLookUp(this.props.siteUrl, "ControleDemandas", "Title", "&$filter=" + filtroMeusTimes).then(retorno => {
            this.setState({ relacionadas: retorno }, () => setTimeout(() => this.state.relacionadoid > 0 ? this.setState({ relacionamento: true }) : this.setState({ relacionamento: false }), 300))
        });
        getProjetos(this.props.siteUrl, "Projeto", "Title", team)
            .then(retorno => {
                this.setState({ projetos: retorno, listaProjetos: true });
            })


        getItemByfilter("?$filter=timeId eq " + valueTeam.Id, this.props.siteUrl, "CamposPadraoPorTime")
            .then(data => {
                this.setState({ CamposPadraoPorTime: data });
                if (this.state.CamposPadraoPorTime.length > 0) {
                    this.setState({ registroID: this.state.CamposPadraoPorTime[0].ID });
                    this.buildFields(this.state.CamposPadraoPorTime[0]);
                }
                else {
                    this.setState({ registroID: 0 })
                    this.ResetFields();
                }
            })
    }
    private _onRenderFooterContent = (): JSX.Element => {
        return (
            <div>
                <div className="msg-erro">
                    {this.state.buttonSave ?
                        <MessageBar>
                            Preencha todos os obrigatórios! ({this.state.errorMsg})
                    </MessageBar> : null}
                </div>

                <PrimaryButton disabled={this.state.disableBTN} onClick={this._salvaDemanda} style={{ marginRight: '8px' }}>Salvar</PrimaryButton>
                <DefaultButton onClick={this._closePanel} style={{ marginRight: '8px' }}>Cancelar</DefaultButton>
            </div>
        );
    };
    private _relacionadoChange = (): void => {

        if (this.state.relacionamento) {
            this.setState({ relacionamento: false, relacionadoid: 0 });
        }
        else { this.setState({ relacionamento: true }); }
    }
    render() {
        return (
            <Panel
                isOpen={true}
                onDismiss={this._closePanel}
                type={PanelType.large}
                isFooterAtBottom={true}
                onRenderFooterContent={this._onRenderFooterContent}
            >
                <div className="form-containner">
                    <div className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg12 rightPanel">
                                <div className="clear-left">
                                    <div className="ms-Grid-col ms-sm12 ms-lg12">
                                        <TextField
                                            label="Título"
                                            required={true}
                                            placeholder="Cadastrar título ou nome da atividade ex: Criação de Usuário..."
                                            onChanged={(value) => this.setState({ titulo: value })}
                                            value={this.state.titulo}
                                            onBlur={this._verificaForm}
                                        />
                                    </div>

                                </div>
                                <div className="clear-left">
                                    <div className="ms-Grid-col ms-sm6 ms-lg6">
                                        <TextField
                                            label="Benefício para o projeto"
                                            placeholder="Deixe-nos saber os benefícios para o projeto..."
                                            multiline
                                            maxLength={10000}
                                            onBlur={this._verificaForm}
                                            required={true}
                                            rows={4}
                                            onChanged={(value) => this.setState({ beneficio: value })}
                                            value={this.state.beneficio}
                                        />
                                    </div>
                                    <div className="ms-Grid-col ms-sm6 ms-lg6">
                                        <TextField
                                            label="Descritivo"
                                            placeholder="Obs..."
                                            required={true}
                                            multiline
                                            maxLength={10000}
                                            onBlur={this._verificaForm}
                                            rows={4}
                                            onChanged={(value) => this.setState({ descritivo: value })}
                                            value={this.state.descritivo}
                                        />
                                    </div>
                                </div>
                                {this.state.RelacionadoChecked ?
                                    <div className="dynamicRow">
                                        <div className="clear-left">
                                            <div className="ms-Grid-col ms-sm12 ms-lg2">
                                                <div id="relacionado">Relacionado?</div>
                                                <div id="check-relacionado">
                                                    <Checkbox checked={this.state.relacionamento} label="" onChange={this._relacionadoChange} ariaDescribedBy={'Relacionado?'} />
                                                </div>
                                            </div>
                                            {this.state.relacionamento ?
                                                <div className="ms-Grid-col ms-sm6 ms-lg10 ">
                                                    <ComboBox
                                                        allowFreeform={false}
                                                        label="Demanda Relacionada:"
                                                        required={false}
                                                        defaultSelectedKey={this.state.relacionadoid}
                                                        useComboBoxAsMenuWidth={true}
                                                        options={this.state.relacionadas}
                                                        onBlur={this._verificaForm}
                                                        value={this.state.relacionadoName}
                                                        onChanged={(value) => this.setState({ relacionada: value }, () => { this.setState({ relacionadoid: this.state.relacionada.Id }) })}
                                                    />
                                                </div>
                                                :
                                                <div className="ms-Grid-col ms-sm6 ms-lg10">
                                                    <Label
                                                        required={false}
                                                    >Demanda Relacionada:</Label>
                                                    <div className="comboboxFake"></div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    : ""}
                                <div className="clear-left">
                                    <div className="ms-Grid-col ms-sm6 ms-lg6 time">
                                        <div className={this.state.timeDesabilitado ? "timedropDown" : ""}>
                                            {this.state.listaTimes ?
                                                <ComboBox allowFreeform={false}
                                                    label="Time:"
                                                    required={true}
                                                    defaultSelectedKey={this.state.timeid}
                                                    useComboBoxAsMenuWidth={true}
                                                    options={this.state.times}
                                                    onBlur={this._verificaForm}
                                                    disabled={this.state.timeDesabilitado}
                                                    value={this.state.timeName}
                                                    onChanged={(value) => this.changeTeam(value)}
                                                /> : <Shimmer shimmerElements={[{ type: ElemType.line, height: 40, width: '100%' }]} />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="clear-left">
                                    <div className="ms-Grid-col ms-sm4 ms-lg4">
                                        <Dropdown
                                            label="Relevância:"
                                            required={true}
                                            onBlur={this._verificaForm}
                                            defaultSelectedKey={this.state.relevanciaid}
                                            options={[
                                                { key: 'Sim', text: 'Sim' },
                                                { key: 'Não', text: 'Não' }
                                            ]}
                                            onChanged={(value) => this.setState({ relevancia: value }, () => { this.setState({ relevanciaid: this.state.relevancia.key }) })}
                                        />
                                    </div>
                                    <div className="ms-Grid-col ms-sm4 ms-lg4">
                                        {this.state.tiposLista ?
                                            <ComboBox allowFreeform={false}
                                                label="Tipo:"
                                                defaultSelectedKey={this.state.tipoid}
                                                required={true}
                                                useComboBoxAsMenuWidth={true}
                                                onBlur={this._verificaForm}
                                                options={this.state.tipos}
                                                onChanged={(value) => this.setState({ tipo: value }, () => { this.setState({ tipoid: this.state.tipo.Id }) })}
                                            /> : <Shimmer shimmerElements={[{ type: ElemType.line, height: 40, width: '100%' }]} />}

                                    </div>
                                    <div className="ms-Grid-col ms-sm4 ms-lg4">
                                        {this.state.statusList ?
                                            <ComboBox allowFreeform={false}
                                                label="Status:"
                                                required={true}
                                                useComboBoxAsMenuWidth={true}
                                                onBlur={this._verificaForm}
                                                defaultSelectedKey={this.state.statusid}
                                                options={this.state.statusList}
                                                onChanged={(value) => this.setState({ status: value },
                                                    () => {
                                                        this.setState({
                                                            statusid: this.state.status.Id,
                                                            statusName: this.state.status
                                                        })

                                                    })}
                                            /> : <Shimmer shimmerElements={[{ type: ElemType.line, height: 40, width: '100%' }]} />}
                                    </div>
                                </div>
                                <div className="clear-left">
                                    <div className="ms-Grid-col ms-sm3 ms-lg3">
                                        <DatePicker
                                            label="Início estimado:"
                                            isRequired={this.state.estimativaObrigatoria}
                                            disabled={this.props.dtprevinicio != null ? true : false}
                                            strings={DayPickerStrings}
                                            placeholder="Escolha uma data..."
                                            allowTextInput={true}
                                            onSelectDate={(value: Date | null | undefined): void => {
                                                this.setState({ dtprevinicio: value });
                                            }}
                                            formatDate={this._onFormatDate}
                                            parseDateFromString={(value: string): Date => this._onParseDateFromString(value, this.state.dtprevinicio)}
                                            value={this.state.dtprevinicio != null ? new Date(this.state.dtprevinicio) : null}
                                        />
                                    </div>
                                    <div className="ms-Grid-col ms-sm3 ms-lg3">
                                        <DatePicker
                                            label="Término estimado:"
                                            isRequired={this.state.estimativaObrigatoria}
                                            disabled={this.props.dtprevfim != null ? true : false}
                                            strings={DayPickerStrings}
                                            placeholder="Escolha uma data..."
                                            allowTextInput={true}
                                            onSelectDate={(value: Date | null | undefined): void => {
                                                this.setState({ dtprevfim: value });
                                            }}
                                            formatDate={this._onFormatDate}
                                            parseDateFromString={(value: string): Date => this._onParseDateFromString(value, this.state.dtprevfim)}
                                            value={this.state.dtprevfim != null ? new Date(this.state.dtprevfim) : null}
                                        />
                                    </div>
                                    <div className="ms-Grid-col ms-sm3 ms-lg3">
                                        <DatePicker
                                            label="Início real:"
                                            isRequired={this.state.estimativaObrigatoria}
                                            strings={DayPickerStrings}
                                            placeholder="Escolha uma data..."
                                            allowTextInput={true}
                                            disabled={this.props.dtinicio != null ? true : false}
                                            onSelectDate={(value: Date | null | undefined): void => {
                                                this.setState({ dtinicio: value });
                                            }}
                                            formatDate={this._onFormatDate}
                                            parseDateFromString={(value: string): Date => this._onParseDateFromString(value, this.state.dtinicio)}
                                            value={this.state.dtinicio != null ? new Date(this.state.dtinicio) : null}
                                        />
                                    </div>
                                    <div className="ms-Grid-col ms-sm3 ms-lg3">
                                        <DatePicker
                                            label="Término real:"
                                            isRequired={this.state.estimativaObrigatoriaEntregue}
                                            strings={DayPickerStrings}
                                            placeholder="Escolha uma data..."
                                            allowTextInput={true}
                                            disabled={this.props.dtfim != null ? true : false}
                                            //onSelectDate={(value) => this.setState({ dtfim: value })}
                                            onSelectDate={(value: Date | null | undefined): void => {
                                                this.setState({ dtfim: value });
                                            }}
                                            formatDate={this._onFormatDate}
                                            parseDateFromString={(value: string): Date => this._onParseDateFromString(value, this.state.dtfim)}
                                            value={this.state.dtfim != null ? new Date(this.state.dtfim) : null}
                                        />
                                    </div>
                                </div>
                                <div className="clear-left">
                                    <div className="ms-Grid-col ms-sm6 ms-lg6">
                                        <TextField
                                            label="Área Solicitante"
                                            required={true}
                                            maxLength={255}
                                            onBlur={this._verificaForm}
                                            placeholder="Área solicitante..."
                                            onChanged={(value) => this.setState({ areasolicitante: value })}
                                            value={this.state.areasolicitante}
                                        />
                                    </div>
                                    <div className="ms-Grid-col ms-sm6 ms-lg6" onBlur={this._verificaForm}>
                                        <Label
                                            required={true}
                                        >Responsável Solicitante:</Label>
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
                                            selecionado={this.props.selecionadoArea}
                                            _getidUser={(val) => this._getResponsavelareaid(val)}
                                            _verificaForm={() => this._verificaForm()}
                                        />
                                    </div>
                                </div>
                                <div className="clear-left">
                                    <div className="ms-Grid-col ms-sm6 ms-lg6">
                                        <Dropdown
                                            label="Demanda:"
                                            required={true}
                                            defaultSelectedKey={this.state.demandakey}
                                            onBlur={this._verificaForm}
                                            options={[
                                                { key: 'Interna', text: 'Interna' },
                                                { key: 'Externa', text: 'Externa' },
                                                { key: 'Interna/Externa', text: 'Interna/Externa' },
                                            ]}
                                            onChanged={(value) => this.changeDemanda(value)}
                                        />
                                    </div>
                                    <div className="ms-Grid-col ms-sm4 ms-lg6">
                                        {this.state.empresasLista ?
                                            <ComboBox allowFreeform={false}
                                                label="Empresa:"
                                                useComboBoxAsMenuWidth={true}
                                                defaultSelectedKey={this.state.empresaid}
                                                required={true}
                                                onBlur={this._verificaForm}
                                                options={this.state.empresas}
                                                onChanged={(value) => this.setState({ empresa: value }, () => { this.setState({ empresaid: this.state.empresa.Id }) })}
                                            /> : <Shimmer shimmerElements={[{ type: ElemType.line, height: 40, width: '100%' }]} />}
                                    </div>
                                </div>
                                <div className="clear-left">
                                    <div className="ms-Grid-col ms-sm6 ms-lg6" onBlur={this._verificaForm}>
                                        <Label required={true}>
                                            Responsável TI:
                                        </Label>
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
                                            selecionado={this.props.selecionadoTI}
                                            _getidUser={(val) => this._getResponsaveltiid(val)}
                                            _verificaForm={() => this._verificaForm()}
                                        />
                                    </div>
                                </div>
                                {this.state.prioridadeChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            <TextField
                                                required={this.state.prioridadeCheckedObrigatorio}
                                                label="Prioridade"
                                                maxLength={255}
                                                onBlur={this._verificaForm}
                                                placeholder="Prioridade..."
                                                onChanged={(value) => this.setState({ prioridade: value })}
                                                value={this.state.prioridade}
                                            />
                                        </div>
                                    </div>
                                    : ""}
                                {this.state.veriFoneChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            <TextField
                                                label="VeriFone"
                                                required={this.state.veriFoneCheckedObrigatorio}
                                                maxLength={255}
                                                onBlur={this._verificaForm}
                                                placeholder="VeriFone..."
                                                onChanged={(value) => this.setState({ veriFone: value })}
                                                value={this.state.veriFone}
                                            />
                                        </div>
                                    </div> : ""}
                                {this.state.volumeChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            <TextField
                                                label="Volume"
                                                required={this.state.volumeCheckedObrigatorio}
                                                maxLength={255}
                                                onBlur={this._verificaForm}
                                                placeholder="Volume..."
                                                onChanged={(value) => this.setState({ volume: value })}
                                                value={this.state.volume}
                                            />
                                        </div>
                                    </div>
                                    : ""}
                                {this.state.estimativaVeriFoneChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            <Dropdown
                                                label="Estimativa Veri Fone:"
                                                required={this.state.estimativaVeriFoneCheckedObrigatorio}
                                                onBlur={this._verificaForm}
                                                defaultSelectedKey={this.state.estimativaVeriFone}
                                                options={[
                                                    { key: 'Sim', text: 'Sim' },
                                                    { key: 'Não', text: 'Não' }
                                                ]}
                                                onChanged={(value) => this.setState({ estimativaVeriFone: value }, () => { this.setState({ estimativaVeriFone: this.state.estimativaVeriFone.key }) })}
                                            />
                                        </div>
                                    </div>
                                    : ""}
                                {this.state.impactoChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            <Dropdown
                                                label="Impacto:"
                                                required={this.state.impactoCheckedObrigatorio}
                                                onBlur={this._verificaForm}
                                                defaultSelectedKey={this.state.impacto}
                                                options={[
                                                    { key: 'ChargeBack indevido', text: 'ChargeBack indevido' },
                                                    { key: 'Trabalho Manual', text: 'Trabalho Manual' },
                                                    { key: 'Erro de informação', text: 'Erro de informação' }
                                                ]}
                                                onChanged={(value) => this.setState({ impacto: value }, () => { this.setState({ impacto: this.state.impacto.key }) })}
                                            />
                                        </div>
                                    </div>
                                    : ""}
                                {this.state.blocoSprintChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            <TextField
                                                label="Bloco/Sprint"
                                                required={this.state.blocoSprintCheckedObrigatorio}
                                                maxLength={250}
                                                placeholder="Bloco/Sprint..."
                                                onChanged={(value) => this.setState({ blocoSprint: value })}
                                                value={this.state.blocoSprint}
                                            />
                                        </div>
                                    </div>
                                    : ""}
                                {this.state.efetuadoReviewChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            <Dropdown
                                                label="Efetuado Review:"
                                                required={this.state.efetuadoReviewCheckedObrigatorio}
                                                onBlur={this._verificaForm}
                                                defaultSelectedKey={this.state.efetuadoReview}
                                                options={[
                                                    { key: 'Sim', text: 'Sim' },
                                                    { key: 'Não', text: 'Não' }
                                                ]}
                                                onChanged={(value) => this.setState({ efetuadoReview: value }, () => { this.setState({ efetuadoReview: this.state.efetuadoReview.key }) })}
                                            />
                                        </div>
                                    </div>
                                    : ""}
                                {this.state.validadoEntregaChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            <Dropdown
                                                label="Validado a entrega - Validade a pós implantação"
                                                required={this.state.validadoEntregaCheckedObrigatorio}
                                                onBlur={this._verificaForm}
                                                defaultSelectedKey={this.state.validadoEntrega}
                                                options={[
                                                    { key: 'Sim', text: 'Sim' },
                                                    { key: 'Não', text: 'Não' }
                                                ]}
                                                onChanged={(value) => this.setState({ validadoEntrega: value }, () => { this.setState({ validadoEntrega: this.state.validadoEntrega.key }) })}
                                            />
                                        </div>
                                    </div>
                                    : ""}
                                {this.state.gerouBugChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            <Dropdown
                                                label="Gerou Bug?:"
                                                required={this.state.gerouBugCheckedObrigatorio}
                                                onBlur={this._verificaForm}
                                                defaultSelectedKey={this.state.gerouBug}
                                                options={[
                                                    { key: 'Sim', text: 'Sim' },
                                                    { key: 'Não', text: 'Não' }
                                                ]}
                                                onChanged={(value) => this.setState({ gerouBug: value }, () => { this.setState({ gerouBug: this.state.gerouBug.key }) })}
                                            />
                                        </div>
                                    </div>
                                    : ""}
                                {this.state.JIRAChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            <TextField
                                                label="JIRA"
                                                required={this.state.JIRACheckedObrigatorio}
                                                maxLength={250}
                                                placeholder="Número do JIRA..."
                                                onChanged={(value) => this.setState({ jira: value })}
                                                value={this.state.jira}
                                            />
                                        </div>
                                    </div>
                                    : ""}


                                {this.state.horasChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            <MaskedTextField 
                                                mask="999999"
                                                label="Horas"
                                                maskChar=""
                                                required={this.state.horasCheckedObrigatorio}
                                                maxLength={250}
                                                placeholder="Horas..."
                                                onChanged={(value) => this.setState({ Horas: value })}
                                                value={this.state.Horas}
                                            />
                                        </div>
                                    </div>
                                    : ""}


                                {this.state.tamanhoDemandaChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            

                                            <Dropdown
                                                label="Tamanho da Demanda:"
                                                required={this.state.tamanhoDemandaCheckedObrigatorio}
                                                onBlur={this._verificaForm}
                                                defaultSelectedKey={this.state.TamanhoDemanda}
                                                options={[
                                                    { key: 'P', text: 'P' },
                                                    { key: 'M', text: 'M' },
                                                    { key: 'G', text: 'G' },
                                                    { key: 'GG', text: 'GG' },
                                                ]}
                                                onChanged={(value) => this.setState({ TamanhoDemanda: value }, () => { this.setState({ TamanhoDemanda: this.state.TamanhoDemanda.key }) })}
                                            />



                                        </div>
                                    </div>
                                    : ""}




                                {this.state.RFCChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            <TextField
                                                label="RFC"
                                                required={this.state.RFCCheckedObrigatorio}
                                                maxLength={250}
                                                placeholder="Número da RFC..."
                                                onChanged={(value) => this.setState({ numeroRFC: value })}
                                                value={this.state.numeroRFC}
                                            />
                                        </div>
                                    </div>
                                    : ""}
                                <div className="dynamicRow">
                                    <div className="ms-Grid-col ms-sm6 ms-lg12" onBlur={this._verificaForm}>
                                        <Label
                                            required={false}
                                        >Participantes:</Label>
                                        <Usuarios
                                            itemLimit={300}
                                            siteUrl={this.props.siteUrl}
                                            siteUrlPicker={this.props.siteUrlPicker}
                                            spHttpClient={this.props.spHttpClient}
                                            typePicker={"normal"}
                                            principalTypeUser={true}
                                            principalTypeSharePointGroup={null}
                                            principalTypeSecurityGroup={null}
                                            principalTypeDistributionList={null}
                                            numberOfItems={15}
                                            selecionado={this.state.participantes}
                                            selecionados={this.state.participantes}
                                            _getidUser={(val) => this._getParticipantesid(val)}
                                            _verificaForm={() => this._verificaForm()}
                                        />
                                    </div>
                                </div>
                                {this.state.FornecedorChecked || this.state.fornecedorRequired ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            {this.state.listaFornecedores ?
                                                <ComboBox allowFreeform={false}
                                                    label="Fornecedor:"
                                                    useComboBoxAsMenuWidth={true}
                                                    required={this.state.fornecedorRequired}
                                                    defaultSelectedKey={this.state.fornecedorid}
                                                    options={this.state.fornecedores}
                                                    onBlur={this._verificaForm}
                                                    onChanged={(value) => this.setState({ fornecedor: value }, () => { this.setState({ fornecedorid: this.state.fornecedor.Id }) })}
                                                /> : <Shimmer shimmerElements={[{ type: ElemType.line, height: 40, width: '100%' }]} />
                                            }
                                        </div>
                                    </div>
                                    : ""}
                                {this.state.ProjetoChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg6">
                                            {this.state.listaProjetos ?
                                                <ComboBox allowFreeform={false}
                                                    label="Projeto:"
                                                    defaultSelectedKey={this.state.projetoid}
                                                    required={this.state.ProjetoCheckedObrigatorio}
                                                    useComboBoxAsMenuWidth={true}
                                                    onBlur={this._verificaForm}
                                                    options={this.state.projetos}
                                                    onChanged={(value) => this.setState({ projeto: value }, () => { this.setState({ projetoid: this.state.projeto.Id }) })}
                                                /> : <Shimmer shimmerElements={[{ type: ElemType.line, height: 40, width: '100%' }]} />
                                            }
                                        </div>
                                    </div>
                                    : ""}
                                {this.state.requestsSAPChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg12">
                                            <TextField
                                                label="Requests SAP"
                                                required={this.state.requestsSAPCheckedObrigatorio}
                                                placeholder="Request SAP..."
                                                multiline
                                                maxLength={10000}
                                                rows={5}
                                                onChanged={(value) => this.setState({ requestSAP: value })}
                                                value={this.state.requestSAP}
                                            />
                                        </div>
                                    </div>
                                    : ""
                                }
                                {this.state.comentariosTecnicosChecked ?
                                    <div className="dynamicRow">
                                        <div className="ms-Grid-col ms-sm6 ms-lg12">
                                            <TextField
                                                label="Comentários Técnicos:"
                                                required={this.state.comentariosTecnicosCheckedObrigatorio}
                                                placeholder="Comentários Técnicos..."
                                                multiline
                                                maxLength={10000}
                                                rows={5}
                                                onChanged={(value) => this.setState({ comentariosTecnicos: value })}
                                                value={this.state.comentariosTecnicos}
                                            />
                                        </div>
                                    </div>
                                    : ""}
                                <div className="clear-left">
                                    <div className="ms-Grid-col ms-sm12 ms-lg12">
                                        <TextField
                                            label="Comentário"
                                            placeholder="Descreva aqui seu comentário..."
                                            multiline={true}
                                            maxLength={10000}
                                            rows={4}
                                            onChanged={(value) => this.setState({ comentarios: value })}
                                            value={this.state.comentarios}
                                        />
                                    </div>
                                </div>
                                <div className="clear-left">
                                    {this.state.mostraComentario
                                        ?
                                        <div className="listaComentarios" onClick={() => this.exibeComentario(this.state.demandaid)}><div className="listaComentarioL">Histórico de Comentários</div><div className="listaComentarioR"><Icon iconName="DoubleChevronUp8" className="ms-IconExample" /></div></div>
                                        :
                                        <div className="listaComentarios" onClick={() => this.exibeComentario(this.state.demandaid)}><div className="listaComentarioL">Histórico de Comentários</div><div className="listaComentarioR"><Icon iconName="DoubleChevronDown8" className="ms-IconExample" /></div></div>
                                    }
                                    <div className="comentarioListagem">
                                        {this.state.mostraComentario
                                            ?
                                            <Comentarios
                                                siteUrl={this.props.siteUrl}
                                                idProjeto={this.state.demandaid}
                                            />
                                            :
                                            ""
                                        }
                                    </div>
                                </div>
                                <div className="clear-left">
                                    <div className="ms-Grid-col ms-sm6 ms-lg6">
                                        {this.state.waitingForFileUpload && <span>Uploading file...</span>}
                                        {
                                            this.state.arq ?
                                                this.state.arq.map((item, key) =>
                                                    <div style={{ display: "flex", marginBottom: "10px" }}>
                                                        <DefaultButton
                                                            href={item.ServerRelativeUrl}
                                                            target="_blank"
                                                            text={item.FileName}
                                                        />
                                                        <DefaultButton
                                                            iconProps={{ iconName: 'Cancel' }}
                                                            className="anexoLink"
                                                            onClick={() => this._delArquivos(this.props.siteUrl, this.state.demandaid, item.FileName, key)}
                                                        />
                                                    </div>
                                                )
                                                : ""}
                                        {this.state.arquivo ?
                                            this.state.arquivo.map((item, key) =>
                                                <div style={{ display: "flex", marginBottom: "10px" }}>
                                                    <DefaultButton
                                                        text={item.nome}
                                                        disabled={true} />
                                                    <DefaultButton
                                                        iconProps={{ iconName: 'Cancel' }}
                                                        onClick={() => this._delLocalArquivos(key)}
                                                    />
                                                </div>
                                            )
                                            : ""
                                        }
                                        <div style={{ display: "flex" }}>
                                            <PrimaryButton iconProps={{ iconName: 'FabricNewFolder' }}>
                                                <label onClick={() => { document.getElementById("myFileUpload").click() }}>Escolher Arquivo</label>
                                                <input id="myFileUpload" type="file" onChange={this.uploadFile} style={{ display: "none" }} />
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Panel>
        )
    }
}
export default FormTimeParametrizado;