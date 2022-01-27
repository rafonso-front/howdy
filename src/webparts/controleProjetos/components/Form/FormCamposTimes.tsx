import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { Shimmer, ShimmerElementType as ElemType } from 'office-ui-fabric-react/lib/Shimmer';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import {
    getToken,
    postCamposPorTime,
    getMyTeams,
    getItemByfilter

} from '../../services';
class FormCamposTimes extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
            horasChecked: false,
            tamanhoDemandaChecked: false,
            blocoSprintChecked: false,
            timeID: 0,
            exibeCampos: false,
            exibeErro: false,
            registroID: 0,
            comentariosTecnicosChecked: false,
            efetuadoReviewChecked: false,
            estimativaVeriFoneChecked: false,
            gerouBugChecked: false,
            impactoChecked: false,
            JIRAChecked: false,
            prioridadeChecked: false,
            requestsSAPChecked: false,
            RFCChecked: false,
            validadoEntregaChecked: false,
            volumeChecked: false,
            ParticipantesChecked: false,
            FornecedorChecked: false,
            RelacionadoChecked: false,
            ProjetoChecked: false,
            blocoSprintCheckedObrigatorio: false,
            horasCheckedObrigatorio: false,
            tamanhoDemandaCheckedObrigatorio: false,
            comentariosTecnicosCheckedObrigatorio: false,
            efetuadoReviewCheckedObrigatorio: false,
            estimativaVeriFoneCheckedObrigatorio: false,
            gerouBugCheckedObrigatorio: false,
            impactoCheckedObrigatorio: false,
            JIRACheckedObrigatorio: false,
            prioridadeCheckedObrigatorio: false,
            requestsSAPCheckedObrigatorio: false,
            RFCCheckedObrigatorio: false,
            validadoEntregaCheckedObrigatorio: false,
            veriFoneCheckedObrigatorio: false,
            volumeCheckedObrigatorio: false,
            ParticipantesCheckedObrigatorio: false,
            // FornecedorCheckedObrigatorio: false,
            // RelacionadoCheckedObrigatorio: false,
            ProjetoCheckedObrigatorio: false,
        }
    }
    componentDidMount() {
        this.buildComboTeam();
    }
    private buildComboTeam = (): void => {
        this.ResetFields();
        this.setState({ exibeCampos: false, listaTimes: false });
        getMyTeams(this.props.siteUrl).then(retorno => {
            this.setState({ times: retorno, listaTimes: true });
        })
    }
    private _salva = (): void => {
        if (this.state.timeID > 0) {
            let dadosForm = {
                Title: "Parametrização de campos por time",
                timeId: this.state.timeID,
                blocoSprint: this.state.blocoSprintCheckedObrigatorio ? "Obrigatorio" : this.state.blocoSprintChecked.toString(),
                comentariosTecnicos: this.state.comentariosTecnicosCheckedObrigatorio ? "Obrigatorio" : this.state.comentariosTecnicosChecked.toString(),
                efetuadoReview: this.state.efetuadoReviewCheckedObrigatorio ? "Obrigatorio" : this.state.efetuadoReviewChecked.toString(),
                estimativaVeriFone: this.state.estimativaVeriFoneCheckedObrigatorio ? "Obrigatorio" : this.state.estimativaVeriFoneChecked.toString(),
                gerouBug: this.state.gerouBugCheckedObrigatorio ? "Obrigatorio" : this.state.gerouBugChecked.toString(),
                impacto: this.state.impactoCheckedObrigatorio ? "Obrigatorio" : this.state.impactoChecked.toString(),
                JIRA: this.state.JIRACheckedObrigatorio ? "Obrigatorio" : this.state.JIRAChecked.toString(),
                prioridade: this.state.prioridadeCheckedObrigatorio ? "Obrigatorio" : this.state.prioridadeChecked.toString(),
                requestsSAP: this.state.requestsSAPCheckedObrigatorio ? "Obrigatorio" : this.state.requestsSAPChecked.toString(),
                RFC: this.state.RFCCheckedObrigatorio ? "Obrigatorio" : this.state.RFCChecked.toString(),
                validadoEntrega: this.state.validadoEntregaCheckedObrigatorio ? "Obrigatorio" : this.state.validadoEntregaChecked.toString(),
                veriFone: this.state.veriFoneCheckedObrigatorio ? "Obrigatorio" : this.state.veriFoneChecked.toString(),
                volume: this.state.volumeCheckedObrigatorio ? "Obrigatorio" : this.state.volumeChecked.toString(),
                Participantes: this.state.ParticipantesCheckedObrigatorio ? "Obrigatorio" : this.state.ParticipantesChecked.toString(),
                // Fornecedor: this.state.FornecedorCheckedObrigatorioFornecedorCheckedObrigatorio ? "Obrigatorio" : this.state.FornecedorChecked.toString(),
                // Relacionado: this.state.RelacionadoCheckedObrigatorio ? "Obrigatorio" : this.state.RelacionadoChecked.toString(),
                Projeto: this.state.ProjetoCheckedObrigatorio ? "Obrigatorio" : this.state.ProjetoChecked.toString(),
                Horas: this.state.horasCheckedObrigatorio ? "Obrigatorio" : this.state.horasChecked.toString(),
                TamanhoDemanda: this.state.tamanhoDemandaCheckedObrigatorio ? "Obrigatorio" : this.state.tamanhoDemandaChecked.toString(),
            }
            getToken(this.props.siteUrl).then(token => {
                postCamposPorTime(this.props.siteUrl, dadosForm, this.state.registroID, token)
                    .then(data => {
                        this.buildComboTeam();
                        this.setState({ Sucesso: true }, () => setTimeout(() => this.setState({ Sucesso: false }), 5000));
                    })
            })
        }
        else {
            this.setState({ exibeErro: true }, () => setTimeout(() => this.setState({ exibeErro: false }), 5000));
        }
    }
    private _fechaPanelCamposPorTime = (): void => {
        this.props._fechaPanelCamposPorTime();
    }
    _onCheckboxChange = (ev, isChecked): void => {
        let componentName = ev.currentTarget.attributes["aria-describedby"].value.trim();;
        if (isChecked && componentName == "blocoSprint") { this.setState({ blocoSprintChecked: true }) }
        if (!isChecked && componentName == "blocoSprint") { this.setState({ blocoSprintChecked: false, blocoSprintCheckedObrigatorio: false }) }

        if (isChecked && componentName == "comentariosTecnicos") { this.setState({ comentariosTecnicosChecked: true }) }
        if (!isChecked && componentName == "comentariosTecnicos") { this.setState({ comentariosTecnicosChecked: false, comentariosTecnicosCheckedObrigatorio: false }) }

        if (isChecked && componentName == "efetuadoReview") { this.setState({ efetuadoReviewChecked: true }) }
        if (!isChecked && componentName == "efetuadoReview") { this.setState({ efetuadoReviewChecked: false, efetuadoReviewCheckedObrigatorio: false }) }

        if (isChecked && componentName == "estimativaVeriFone") { this.setState({ estimativaVeriFoneChecked: true }) }
        if (!isChecked && componentName == "estimativaVeriFone") { this.setState({ estimativaVeriFoneChecked: false, estimativaVeriFoneCheckedObrigatorio: false }) }

        if (isChecked && componentName == "gerouBug") { this.setState({ gerouBugChecked: true }) }
        if (!isChecked && componentName == "gerouBug") { this.setState({ gerouBugChecked: false, gerouBugCheckedObrigatorio: false }) }

        if (isChecked && componentName == "impacto") { this.setState({ impactoChecked: true }) }
        if (!isChecked && componentName == "impacto") { this.setState({ impactoChecked: false, impactoCheckedObrigatorio: false }) }

        if (isChecked && componentName == "JIRA") { this.setState({ JIRAChecked: true }) }
        if (!isChecked && componentName == "JIRA") { this.setState({ JIRAChecked: false, JIRACheckedObrigatorio: false }) }

        if (isChecked && componentName == "prioridade") { this.setState({ prioridadeChecked: true }) }
        if (!isChecked && componentName == "prioridade") { this.setState({ prioridadeChecked: false, prioridadeCheckedObrigatorio: false }) }

        if (isChecked && componentName == "requestsSAP") { this.setState({ requestsSAPChecked: true }) }
        if (!isChecked && componentName == "requestsSAP") { this.setState({ requestsSAPChecked: false, requestsSAPCheckedObrigatorio: false }) }

        if (isChecked && componentName == "RFC") { this.setState({ RFCChecked: true }) }
        if (!isChecked && componentName == "RFC") { this.setState({ RFCChecked: false, RFCCheckedObrigatorio: false }) }

        if (isChecked && componentName == "validadoEntrega") { this.setState({ validadoEntregaChecked: true }) }
        if (!isChecked && componentName == "validadoEntrega") { this.setState({ validadoEntregaChecked: false, validadoEntregaCheckedObrigatorio: false }) }

        if (isChecked && componentName == "veriFone") { this.setState({ veriFoneChecked: true }) }
        if (!isChecked && componentName == "veriFone") { this.setState({ veriFoneChecked: false, veriFoneCheckedObrigatorio: false }) }

        if (isChecked && componentName == "volume") { this.setState({ volumeChecked: true }) }
        if (!isChecked && componentName == "volume") { this.setState({ volumeChecked: false, volumeCheckedObrigatorio: false }) }

        if (isChecked && componentName == "Participantes") { this.setState({ ParticipantesChecked: true }) }
        if (!isChecked && componentName == "Participantes") { this.setState({ ParticipantesChecked: false, ParticipantesCheckedObrigatorio: false }) }

        // if (isChecked && componentName == "Fornecedor") { this.setState({ FornecedorChecked: true }) }
        // if (!isChecked && componentName == "Fornecedor") { this.setState({ FornecedorChecked: false,FornecedorCheckedObrigatorio: false }) }

        // if (isChecked && componentName == "Relacionado") { this.setState({ RelacionadoChecked: true }) }
        // if (!isChecked && componentName == "Relacionado") { this.setState({ RelacionadoChecked: false,RelacionadoCheckedObrigatorio: false }) }

        if (isChecked && componentName == "Projeto") { this.setState({ ProjetoChecked: true }) }
        if (!isChecked && componentName == "Projeto") { this.setState({ ProjetoChecked: false, ProjetoCheckedObrigatorio: false }) }


        if (isChecked && componentName == "Horas") { this.setState({ horasChecked: true }) }
        if (!isChecked && componentName == "Horas") { this.setState({ horasChecked: false, horasCheckedObrigatorio: false }) }


        if (isChecked && componentName == "TamanhoDemanda") { this.setState({ tamanhoDemandaChecked: true }) }
        if (!isChecked && componentName == "TamanhoDemanda") { this.setState({ tamanhoDemandaChecked: false, tamanhoDemandaCheckedObrigatorio: false }) }
    }
    _onCheckboxChangeObrigatorio = (ev, isChecked): void => {
        let componentName = ev.currentTarget.attributes["aria-describedby"].value.trim();;
        if (isChecked && componentName == "blocoSprint") { this.setState({ blocoSprintCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "blocoSprint") { this.setState({ blocoSprintCheckedObrigatorio: false }) }

        if (isChecked && componentName == "comentariosTecnicos") { this.setState({ comentariosTecnicosCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "comentariosTecnicos") { this.setState({ comentariosTecnicosCheckedObrigatorio: false }) }

        if (isChecked && componentName == "efetuadoReview") { this.setState({ efetuadoReviewCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "efetuadoReview") { this.setState({ efetuadoReviewCheckedObrigatorio: false }) }

        if (isChecked && componentName == "estimativaVeriFone") { this.setState({ estimativaVeriFoneCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "estimativaVeriFone") { this.setState({ estimativaVeriFoneCheckedObrigatorio: false }) }

        if (isChecked && componentName == "gerouBug") { this.setState({ gerouBugCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "gerouBug") { this.setState({ gerouBugCheckedObrigatorio: false }) }

        if (isChecked && componentName == "impacto") { this.setState({ impactoCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "impacto") { this.setState({ impactoCheckedObrigatorio: false }) }

        if (isChecked && componentName == "JIRA") { this.setState({ JIRACheckedObrigatorio: true }) }
        if (!isChecked && componentName == "JIRA") { this.setState({ JIRACheckedObrigatorio: false }) }

        if (isChecked && componentName == "prioridade") { this.setState({ prioridadeCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "prioridade") { this.setState({ prioridadeCheckedObrigatorio: false }) }

        if (isChecked && componentName == "requestsSAP") { this.setState({ requestsSAPCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "requestsSAP") { this.setState({ requestsSAPCheckedObrigatorio: false }) }

        if (isChecked && componentName == "RFC") { this.setState({ RFCCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "RFC") { this.setState({ RFCCheckedObrigatorio: false }) }

        if (isChecked && componentName == "validadoEntrega") { this.setState({ validadoEntregaCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "validadoEntrega") { this.setState({ validadoEntregaCheckedObrigatorio: false }) }

        if (isChecked && componentName == "veriFone") { this.setState({ veriFoneCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "veriFone") { this.setState({ veriFoneCheckedObrigatorio: false }) }

        if (isChecked && componentName == "volume") { this.setState({ volumeCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "volume") { this.setState({ volumeCheckedObrigatorio: false }) }

        if (isChecked && componentName == "Participantes") { this.setState({ ParticipantesCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "Participantes") { this.setState({ ParticipantesCheckedObrigatorio: false }) }

        // if (isChecked && componentName == "Fornecedor") { this.setState({ FornecedorCheckedObrigatorio: true }) }
        // if (!isChecked && componentName == "Fornecedor") { this.setState({ FornecedorCheckedObrigatorio: false }) }

        // if (isChecked && componentName == "Relacionado") { this.setState({ RelacionadoCheckedObrigatorio: true }) }
        // if (!isChecked && componentName == "Relacionado") { this.setState({ RelacionadoCheckedObrigatorio: false }) }

        if (isChecked && componentName == "Projeto") { this.setState({ ProjetoCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "Projeto") { this.setState({ ProjetoCheckedObrigatorio: false }) }


        if (isChecked && componentName == "Horas") { this.setState({ horasCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "Horas") { this.setState({ horasCheckedObrigatorio: false }) }


        if (isChecked && componentName == "TamanhoDemanda") { this.setState({ tamanhoDemandaCheckedObrigatorio: true }) }
        if (!isChecked && componentName == "TamanhoDemanda") { this.setState({ tamanhoDemandaCheckedObrigatorio: false }) }

    }

    private changeTeam = (valueTeam) => {
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
        this.setState({ timeID: valueTeam.Id, exibeCampos: true })
    }
    private ResetFields = () => {
        this.setState({ blocoSprintChecked: false });
        this.setState({ horasChecked: false });
        this.setState({ tamanhoDemandaChecked: false });
        this.setState({ comentariosTecnicosChecked: false });
        this.setState({ efetuadoReviewChecked: false });
        this.setState({ estimativaVeriFoneChecked: false });
        this.setState({ gerouBugChecked: false });
        this.setState({ impactoChecked: false });
        this.setState({ JIRAChecked: false });
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
        this.setState({ horasCheckedObrigatorio: false });
        this.setState({ tamanhoDemandaCheckedObrigatorio: false });
        this.setState({ comentariosTecnicosCheckedObrigatorio: false });
        this.setState({ efetuadoReviewCheckedObrigatorio: false });
        this.setState({ estimativaVeriFoneCheckedObrigatorio: false });
        this.setState({ gerouBugCheckedObrigatorio: false });
        this.setState({ impactoCheckedObrigatorio: false });
        this.setState({ JIRACheckedObrigatorio: false });
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
        if (retornoConsulta.Horas != "false") {
            this.setState({ horasChecked: true });
            if (retornoConsulta.Horas == "Obrigatorio") {
                this.setState({ horasCheckedObrigatorio: true });
            }
        }
        if (retornoConsulta.TamanhoDemanda != "false") {
            debugger
            this.setState({ tamanhoDemandaChecked: true });
            if (retornoConsulta.TamanhoDemanda == "Obrigatorio") {
                this.setState({ tamanhoDemandaCheckedObrigatorio: true });
            }
        }
    }

    private _onRenderFooterContent = (): JSX.Element => {
        return (
            <div>
                {this.state.IsMember && this.state.erroMsg.length > 0 ?
                    <MessageBar messageBarType={MessageBarType.blocked}>
                        <span dangerouslySetInnerHTML={{ __html: this.state.erroMsg.join(" <br/> ") }}></span>
                    </MessageBar>
                    :
                    ""
                }
                {this.state.Sucesso ? <MessageBar messageBarType={MessageBarType.success}>Salvo com sucesso!</MessageBar>
                    :
                    ""
                }
                {this.state.exibeErro ? <MessageBar messageBarType={MessageBarType.error}>Selecione um time.</MessageBar> : ""}
                <div>
                    <PrimaryButton onClick={this._salva} style={{ marginRight: '8px' }}>Salvar</PrimaryButton>
                    <DefaultButton onClick={this._fechaPanelCamposPorTime} style={{ marginRight: '8px' }}>Fechar</DefaultButton>
                </div>
            </div>
        );
    };
    render() {
        return (
            <div>
                <Panel
                    isOpen={true}
                    onDismiss={this._fechaPanelCamposPorTime}
                    type={PanelType.medium}
                    isFooterAtBottom={true}
                    onRenderFooterContent={this._onRenderFooterContent}
                >
                    <div className="frameHist itens-track">
                        <div className="demanda-nome">
                            Selecione os campos adicionais por time
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-lg12">
                            {this.state.listaTimes ?
                                <ComboBox allowFreeform={false}
                                    label="Time:"
                                    required={true}
                                    defaultSelectedKey={this.state.timeid}
                                    useComboBoxAsMenuWidth={true}
                                    options={this.state.times}
                                    disabled={this.state.timeDesabilitado}
                                    value={this.state.timeName}
                                    onChanged={(value) => this.changeTeam(value)}
                                /> : <Shimmer shimmerElements={[{ type: ElemType.line, height: 40, width: '100%' }]} />
                            }
                            <p></p>
                            {this.state.exibeCampos ?
                                <div className="clear-left">
                                    <div className="linha-Check">
                                        <Icon iconName="Dropdown" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.ProjetoChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'Projeto'} />
                                        </div>
                                        <div id="linhaDescricao">Projeto</div>
                                        <div className="Obrigatorio">
                                            {this.state.ProjetoChecked ?
                                                <Checkbox checked={this.state.ProjetoCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'Projeto'} />
                                                :
                                                ""
                                            }

                                        </div>
                                    </div>
                                    {/* <div className="linha-Check">
                                        <Icon iconName="Dropdown" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.RelacionadoChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'Relacionado'} />
                                        </div>
                                        <div id="linhaDescricao">Relacionado</div>
                                        <div className="Obrigatorio">

                                            {this.state.RelacionadoChecked ?
                                                <Checkbox checked={this.state.RelacionadoCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'Relacionado'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div> */}
                                    {/* <div className="linha-Check">
                                        <Icon iconName="Dropdown" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.FornecedorChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'Fornecedor'} />
                                        </div>
                                        <div id="linhaDescricao">Fornecedor</div>
                                        <div className="Obrigatorio">
                                            {this.state.FornecedorChecked ?
                                                <Checkbox checked={this.state.FornecedorCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'Fornecedor'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div> */}
                                    {/* <div className="linha-Check">
                                        <Icon iconName="People" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.ParticipantesChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'Participantes'} />
                                        </div>
                                        <div id="linhaDescricao">Participantes</div>
                                        <div className="Obrigatorio">
                                            { {this.state.ParticipantesChecked ?
                                                <Checkbox checked={this.state.ParticipantesCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'Participantes'} />
                                                :
                                                ""
                                            } }
                                        </div>
                                    </div> */}

                                    <div className="linha-Check">
                                        <Icon iconName="TextField" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.blocoSprintChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'blocoSprint'} />
                                        </div>
                                        <div id="linhaDescricao">Bloco/Sprint</div>
                                        <div className="Obrigatorio">
                                            {this.state.blocoSprintChecked ?
                                                <Checkbox checked={this.state.blocoSprintCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'blocoSprint'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="TextBox" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.comentariosTecnicosChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'comentariosTecnicos'} />
                                        </div>
                                        <div id="linhaDescricao">Comentários Técnicos </div>
                                        <div className="Obrigatorio">
                                            {this.state.comentariosTecnicosChecked ?
                                                <Checkbox checked={this.state.comentariosTecnicosCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'comentariosTecnicos'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="TextField" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.efetuadoReviewChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'efetuadoReview'} />
                                        </div>
                                        <div id="linhaDescricao">Efetuado Review</div>
                                        <div className="Obrigatorio">
                                            {this.state.efetuadoReviewChecked ?
                                                <Checkbox checked={this.state.efetuadoReviewCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'efetuadoReview'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="Dropdown" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.estimativaVeriFoneChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'estimativaVeriFone'} />
                                        </div>
                                        <div id="linhaDescricao">Estimativa VeriFone</div>
                                        <div className="Obrigatorio">
                                            {this.state.estimativaVeriFoneChecked ?
                                                <Checkbox checked={this.state.estimativaVeriFoneCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'estimativaVeriFone'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="Dropdown" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.gerouBugChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'gerouBug'} />
                                        </div>
                                        <div id="linhaDescricao">Gerou bug?</div>
                                        <div className="Obrigatorio">
                                            {this.state.gerouBugChecked ?
                                                <Checkbox checked={this.state.gerouBugCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'gerouBug'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="Dropdown" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.impactoChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'impacto'} />
                                        </div>
                                        <div id="linhaDescricao">Impacto</div>
                                        <div className="Obrigatorio">
                                            {this.state.impactoChecked ?
                                                <Checkbox checked={this.state.impactoCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'impacto'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="TextField" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.JIRAChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'JIRA'} />
                                        </div>
                                        <div id="linhaDescricao">JIRA</div>
                                        <div className="Obrigatorio">
                                            {this.state.JIRAChecked ?
                                                <Checkbox checked={this.state.JIRACheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'JIRA'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="TextField" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.prioridadeChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'prioridade'} />
                                        </div>
                                        <div id="linhaDescricao">Prioridade</div>
                                        <div className="Obrigatorio">
                                            {this.state.prioridadeChecked ?
                                                <Checkbox checked={this.state.prioridadeCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'prioridade'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="TextBox" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.requestsSAPChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'requestsSAP'} />
                                        </div>
                                        <div id="linhaDescricao">Requests SAP </div>
                                        <div className="Obrigatorio">
                                            {this.state.requestsSAPChecked ?
                                                <Checkbox checked={this.state.requestsSAPCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'requestsSAP'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="TextField" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.RFCChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'RFC'} />
                                        </div>
                                        <div id="linhaDescricao">RFC</div>
                                        <div className="Obrigatorio">
                                            {this.state.RFCChecked ?
                                                <Checkbox checked={this.state.RFCCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'RFC'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="Dropdown" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.validadoEntregaChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'validadoEntrega'} />
                                        </div>
                                        <div id="linhaDescricao">Validado a Entrega </div>
                                        <div className="Obrigatorio">
                                            {this.state.validadoEntregaChecked ?
                                                <Checkbox checked={this.state.validadoEntregaCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'validadoEntrega'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="TextField" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.veriFoneChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'veriFone'} />
                                        </div>
                                        <div id="linhaDescricao">VeriFone</div>
                                        <div className="Obrigatorio">
                                            {this.state.veriFoneChecked ?
                                                <Checkbox checked={this.state.veriFoneCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'veriFone'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="TextField" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.volumeChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'volume'} />
                                        </div>
                                        <div id="linhaDescricao">Volume</div>
                                        <div className="Obrigatorio">
                                            {this.state.volumeChecked ?
                                                <Checkbox checked={this.state.volumeCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'volume'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>









                                    <div className="linha-Check">
                                        <Icon iconName="TextField" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.horasChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'Horas'} />
                                        </div>
                                        <div id="linhaDescricao">Horas</div>
                                        <div className="Obrigatorio">
                                            {this.state.horasChecked ?
                                                <Checkbox checked={this.state.horasCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'Horas'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>
                                    <div className="linha-Check">
                                        <Icon iconName="TextField" className="ms-Icon" />
                                        <div className="selecaoField">
                                            <Checkbox checked={this.state.tamanhoDemandaChecked} label="Standard checkbox" onChange={this._onCheckboxChange} ariaDescribedBy={'TamanhoDemanda'} />
                                        </div>
                                        <div id="linhaDescricao">Tamanho da Demanda</div>
                                        <div className="Obrigatorio">
                                            {this.state.tamanhoDemandaChecked ?
                                                <Checkbox checked={this.state.tamanhoDemandaCheckedObrigatorio} label="Obrigatório?" onChange={this._onCheckboxChangeObrigatorio} ariaDescribedBy={'TamanhoDemanda'} />
                                                :
                                                ""
                                            }
                                        </div>
                                    </div>

                                </div>
                                : ""}
                        </div>
                    </div>
                </Panel>
            </div>
        )
    }
}
export default FormCamposTimes;