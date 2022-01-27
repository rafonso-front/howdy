import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import FormTimeParametrizado from '../Form/FormTimeParametrizado';
import {
    getInitials,
} from '../../services';
class Demanda extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
            editDemanda: true,
            siteUrl: this.props.siteUrl,
            siteUrlPicker: this.props.siteUrlPicker,
            spHttpClient: this.props.spHttpClient,
            empresa: this.props.empresa,
            requestSAP: this.props.requestSAP,
            demandaid: this.props.demandaid,
            titulo: this.props.titulo,
            beneficio: this.props.beneficio,
            time: this.props.time,
            relacionado: this.props.relacionado,
            descritivo: this.props.descritivo,
            relevancia: this.props.relevancia,
            projeto: this.props.projeto,
            tipo: this.props.tipo,
            status: this.props.status,
            statusName: this.props.statusName,
            areasolicitante: this.props.areasolicitante,
            selecionadoArea: this.props.selecionadoArea,
            selecionadoAreaId: this.props.selecionadoAreaId,
            fornecedor: this.props.fornecedor,
            demanda: this.props.demanda,
            dtprevinicio: this.props.dtprevinicio,
            dtinicio: this.props.dtinicio,
            dtprevfim: this.props.dtprevfim,
            dtfim: this.props.dtfim,
            numeroRFC: this.props.numeroRFC,
            comentarios: this.props.comentarios,
            selecionadoTI: this.props.selecionadoTI,
            selecionadoTIId: this.props.selecionadoTIId,
            jira: this.props.jira,
            prioridade: this.props._prioridade,
            veriFone: this.props.veriFone,
            volume: this.props.volume,
            estimativaVeriFone: this.props.estimativaVeriFone,
            impacto: this.props.impacto,
            blocoSprint: this.props.blocoSprint,
            efetuadoReview: this.props.efetuadoReview,
            validadoEntrega: this.props.validadoEntrega,
            gerouBug: this.props.gerouBug,
            comentariosTecnicos: this.props.comentariosTecnicos,
            statusExclusao: this.props.statusExclusao,
            demandaRelacionada: this.props.demandaRelacionada,
            demandaRelacionadaTitle: this.props.demandaRelacionadaTitle,
            currentUserId: this.props.currentUserId,
            Horas: this.props.Horas,
			TamanhoDemanda: this.props.TamanhoDemanda,


        };
    }
    _atualiza = () => {
        this.props._atualiza();
    }
    _fechaaddDemanda = () => {
        this.props._hidepanel();
    }
    _editarDemanda = () => {
        this.setState({ editDemanda: true })
    }
    componentDidMount() {

    }

    _defineUsers = (usersID) => {
        
        let ids: (IPersonaProps & { key: string | number })[] = [];

        if (usersID != undefined) {
            usersID.map(user => {
                ids.push(
                    {
                        key: user.Id,
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
    render() {
        return (
            <div>
                {this.state.statusExclusao == null
                    ?
                    ""
                    :
                    ""
                }
                {
                    this.state.editDemanda ?
                        <FormTimeParametrizado
                            showPanel={false}
                            siteUrl={this.props.siteUrl}
                            siteUrlPicker={this.props.siteUrlPicker}
                            spHttpClient={this.props.spHttpClient}
                            empresa={this.props.empresa}
                            requestSAP={this.props.requestSAP}
                            demandaid={this.props.demandaid}
                            titulo={this.props.titulo}
                            beneficio={this.props.beneficio}
                            time={this.props.time}
                            descritivo={this.props.descritivo}
                            relevancia={this.props.relevancia}
                            projeto={this.props.projeto}
                            tipo={this.props.tipo}
                            status={this.props.status}
                            statusName={this.props.statusName}
                            areasolicitante={this.props.areasolicitante}
                            selecionadoArea={this.props.selecionadoArea}
                            selecionadoAreaId={this.props.selecionadoAreaId}
                            fornecedor={this.props.fornecedor}
                            demanda={this.props.demanda}
                            dtprevinicio={this.props.dtprevinicio}
                            dtinicio={this.props.dtinicio}
                            dtprevfim={this.props.dtprevfim}
                            dtfim={this.props.dtfim}
                            jira={this.props.jira}
                            numeroRFC={this.props.numeroRFC}
                            comentarios={this.props.comentarios}
                            selecionadoTI={this.props.selecionadoTI}
                            selecionadoTIId={this.props.selecionadoTIId}
                            _atualiza={() => this._atualiza()}
                            edicao={this.props.edicao}
                            addDemanda={this.state.editDemanda}
                            _fechaaddDemanda={() => this._fechaaddDemanda()}
                            prioridade={this.props.prioridade}
                            veriFone={this.props.veriFone}
                            volume={this.props.volume}
                            estimativaVeriFone={this.props.estimativaVeriFone}
                            impacto={this.props.impacto}
                            blocoSprint={this.props.blocoSprint}
                            efetuadoReview={this.props.efetuadoReview}
                            validadoEntrega={this.props.validadoEntrega}
                            gerouBug={this.props.gerouBug}
                            comentariosTecnicos={this.props.comentariosTecnicos}

                            demandaRelacionada={this.props.demandaRelacionada}
                            demandaRelacionadaId={this.props.demandaRelacionadaId}
                            participantesId={this.props.participantesId}
                            participantes={this._defineUsers(this.props.participantes)}
                            Horas={this.props.Horas}
                            TamanhoDemanda={this.props.TamanhoDemanda}
        

                        /> : null
                }
            </div>
        )
    }
}
export default Demanda;