import axios from 'axios';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import Card from "../Card/card"
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import Form from "../Form/Form"
import FormTimeParametrizado from "../Form/FormTimeParametrizado"
import Projeto from "../Form/projetos"
import Times from "../Form/times"
import Filtro from "../filtro/filtro"
import Fup from "../Fup/fup"
import Exclui from "../exclusao/exclui"
import WebTour from "../webTour/webTour"
import WebTourUser from "../webTour/WebTourUser"
import WebTourNews from "../webTour/webTourNews"
import FormCamposTimes from "../Form/FormCamposTimes"



import {
	timesQueSouGestor,
	timesQueSouMembro,
	tourVisualizado
} from '../../services';
class containner extends React.Component<any, any> {
	constructor(props: {}) {
		super(props);
		this.state = {
			showPanel: false,
			showPanelTimes: false,
			showCamposTimes: false,
			exibeCard: true,
			filtroAtivo: false,
			filtroValue: "",
			geraFup: false,
			favoritoCheck: false,
			isGestor: false,
			isMember: false,
			erroPermissao: "",
			currentUserId: "",
			currentUser: "",
			normalComponent: true,
			showWebTour: false,
			showWebTourNews: false,

		}
	}
	componentDidMount() {
		axios.get(this.props.urlSite + "_api/web/currentUser").then((cUser) => {


			this.setState({ currentUser: cUser });
			this.setState({ currentUserId: this.state.currentUser.data.Id });
			timesQueSouGestor(this.props.urlSite).then(data => {
				this.setState({ myteams: data })
				if (this.state.myteams.length > 0) {
					this.setState({ isGestor: true });
					if (location.href.toLowerCase().indexOf("deletademanda") > -1)
						this.setState({ normalComponent: false })
				}
				else {
					timesQueSouMembro(this.props.urlSite).then(data => {
						this.setState({ myteams: data })
						if (this.state.myteams.length > 0)
							this.setState({ isMember: true })
						else
							this.setState({ erroPermissao: "Algo aconteceu aqui, entre em contato com l-team-sharepoint@uolinc.com." })
					})
				}
			})

			tourVisualizado(this.props.urlSite).then(retornoTour => {
				
				this.setState({ tourItens: retornoTour })
				if (this.state.tourItens.length < 1) {
					this.setState({ showWebTour: true })
				}
				if (this.state.tourItens.length == 1) {
					this.setState({ showWebTourNews: true })
				}
			})
		})
	}
	private abreform = (): void => {
		this.setState({ showPanel: true });
	}
	private geraFup = (): void => {
		this.setState({ geraFup: true }, () => setTimeout(() => this.setState({ geraFup: false }), 300))
	}
	private abreformProjetos = (): void => {
		this.setState({ showPanelProjetos: true });
	}
	private _closePanelProjetos = (): void => {
		this.setState({ showPanelProjetos: false });
	}
	private abreformTimes = (): void => {
		this.setState({ showPanelTimes: true });
	}
	private _closePanelTimes = (): void => {
		this.setState({ showPanelTimes: false });
	}
	private _fechaPanelCamposPorTime = (): void => {
		this.setState({ showCamposTimes: false });
	}
	private _abrePanelCamposPorTime = (): void => {
		this.setState({ showCamposTimes: true });
	}




	private _closePanel = (): void => {
		this.setState({ showPanel: false });
		this.setState({ exibeCard: false }, () => setTimeout(() => this.setState({ exibeCard: true }), 100))
		this.props._fechaaddDemanda ? this.props._fechaaddDemanda() : null;
		this.setState({ exibeCard: false }, () => setTimeout(() => this.setState({ exibeCard: true }), 100))
	};
	private meusFav = (): void => {
		this.setState({ favoritoCheck: this.state.favoritoCheck ? false : true })
	}
	private uncheckFav = (): void => {
		this.setState({ favoritoCheck: false })
	}
	private aplicaFiltro = (filtro): void => {
		this.setState({ filtroAtivo: filtro.length > 0 ? true : false, filtroValue: filtro });
		this.setState({ exibeCard: false }, () => setTimeout(() => this.setState({ exibeCard: true }), 100))
	}
	render() {
		return (
			<div className='corpo-invision'>


				{this.state.showWebTour ?
					<div className="WebTour">
						{this.state.isGestor ?
							<WebTour
								currentUser={this.state.currentUser}
								siteUrl={this.props.urlSite}
							/>
							:
							// <WebTour
							<WebTourUser
								currentUser={this.state.currentUser}
								siteUrl={this.props.urlSite}
							/>
						}
					</div>
					:
					<div>
						{this.state.showWebTourNews ?
							<div>
								{this.state.isGestor ?
									<WebTourNews
										currentUser={this.state.currentUser}
										siteUrl={this.props.urlSite}
									/>
									:
									// <WebTour
									""
								}
							</div>
							:
							""
						}
					</div>
				}
				{this.state.normalComponent == false ?
					<Exclui
						isGestor={this.state.isGestor}
						isMember={this.state.isMember}
						siteUrl={this.props.urlSite}
					/>
					:
					<div>
						{this.state.isGestor || this.state.isMember ?
							<div>
								<div className="ficha">




									{this.state.showCamposTimes ?
										<FormCamposTimes
											siteUrl={this.props.urlSite}
											_fechaPanelCamposPorTime={() => this._fechaPanelCamposPorTime()}
										/>
										: ""
									}

									{this.state.showPanelTimes ?
										<Times
											currentUserId={this.state.currentUserId}
											_closePanel={() => this._closePanelTimes()}
											siteUrl={this.props.urlSite}
											siteUrlPicker={this.props.siteUrlPicker}
											spHttpClient={this.props.spHttpClient}
										/>
										:
										""
									}
									{this.state.geraFup ?
										<Fup
											currentUserId={this.state.currentUserId}

											filtroAtivo={this.state.filtroAtivo}
											filtroValue={this.state.filtroValue}
											siteUrl={this.props.urlSite}
										/>
										:
										""
									}
									{this.state.showPanelProjetos ?
										<Projeto
											currentUserId={this.state.currentUserId}
											_closePanel={() => this._closePanelProjetos()}
											siteUrl={this.props.urlSite}
											siteUrlPicker={this.props.siteUrlPicker}
											spHttpClient={this.props.spHttpClient}
										/>
										:
										""
									}
									{this.state.showPanel ?
										<div>
											{this.state.FormTimeParametrizado ?
												<FormTimeParametrizado
													currentUserId={this.state.currentUserId}
													pageUrl={this.props.pageUrl}
													description={this.props.description}
													siteUrl={this.props.urlSite}
													siteUrlPicker={this.props.siteUrlPicker}
													spHttpClient={this.props.spHttpClient}
													edit={false}
													_atualiza={() => this._closePanel()}
													_closePanel={() => this._closePanel()}
												/>
												:
												<FormTimeParametrizado
													currentUserId={this.state.currentUserId}
													pageUrl={this.props.pageUrl}
													description={this.props.description}
													siteUrl={this.props.urlSite}
													siteUrlPicker={this.props.siteUrlPicker}
													spHttpClient={this.props.spHttpClient}
													edit={false}
													_atualiza={() => this._closePanel()}
													_closePanel={() => this._closePanel()}
												/>
											}
										</div>
										:
										""
									}
								</div>
								<div className="filtro-invision">
									<Filtro
										currentUserId={this.state.currentUserId}
										siteUrl={this.props.urlSite}
										_filtro={(filtroValue) => this.aplicaFiltro(filtroValue)}
										siteUrlPicker={this.props.siteUrlPicker}
										spHttpClient={this.props.spHttpClient}
										favoritoCheck={this.state.favoritoCheck}
										uncheckFav={(filtroValue) => this.uncheckFav()}

									/>
								</div>
								<div className="painel-invision" id="painel-invision">
									<div className="closed-item">
										<div className="itens hide">
											<Icon iconName="AlertSolid" className="ms-IconExample" />
										</div>
										<div className="itens hide">
											<Icon iconName="AlertSolid" className="ms-IconExample" />
										</div>
										<div className="itens hide">
											<Icon iconName="AlertSolid" className="ms-IconExample" />
										</div>
									</div>
									<div className="open-item">
										<div className="itens open">
											<Icon iconName="AlertSolid" className="ms-IconExample" />
										</div>
										<div className="itens open">
											<Icon iconName="AlertSolid" className="ms-IconExample" />
										</div>
										<div className="itens open">
											<Icon iconName="AlertSolid" className="ms-IconExample" />
										</div>
									</div>
									<ul>
										<li className="liAddDemanda">
											<div className="img-painel" >
												<Icon iconName="NewFolder" className="ms-IconExample" />
											</div>
											<div className="texto-painel">
												Adicionar Demanda
								</div>
											<PrimaryButton iconProps={{ iconName: 'NewFolder' }} text="" onClick={this.abreform} />
										</li>
										<li>
											<div className="img-painel">
												<Icon iconName="CompassNW" className="ms-IconExample" />
											</div>
											<div className="texto-painel">
												Relatórios
								</div>
										</li>
										{this.state.favoritoCheck
											?
											<li className="checked-fav liFavoritos">
												<div className="img-painel" >
													<Icon iconName="GlobeFavorite" className="ms-IconExample" />
												</div>
												<div className="texto-painel">
													Meus Favoritos
										</div>
												<PrimaryButton iconProps={{ iconName: 'GlobeFavorite' }} text="" onClick={() => this.meusFav()} />
											</li>
											:
											<li className="liFavoritos">
												<div className="img-painel" >
													<Icon iconName="GlobeFavorite" className="ms-IconExample" />
												</div>
												<div className="texto-painel">
													Meus Favoritos
										</div>
												<PrimaryButton iconProps={{ iconName: 'GlobeFavorite' }} text="" onClick={() => this.meusFav()} />
											</li>
										}
										<li className="liFup">
											<div className="img-painel" >
												<Icon iconName="DownloadDocument" className="ms-IconExample" />
											</div>
											<div className="texto-painel">
												FUP
								</div>
											<PrimaryButton iconProps={{ iconName: 'DownloadDocument' }} text="" onClick={this.geraFup} />
										</li>
									</ul>
									{this.state.isGestor ?
										<ul className="ul-adm">
											{/* <li className="menu-adm">
									<div className="img-painel">
										<Icon iconName="Admin" className="ms-IconExample" />  
									</div>
									<div className="texto-painel">
										Administração
									</div>					
								</li> */}
											<li className="liTimes">
												<div className="img-painel">
													<Icon iconName="People" className="ms-IconExample" />
												</div>
												<div className="texto-painel">
													Times
									</div>
												<PrimaryButton iconProps={{ iconName: 'NewFolder' }} text="" onClick={this.abreformTimes} />
											</li>
											<li className="liProjetos">
												<div className="img-painel">
													<Icon iconName="ProjectLogo32" className="ms-IconExample" />
												</div>
												<div className="texto-painel">
													Projetos
									</div>
												<PrimaryButton iconProps={{ iconName: 'ProjectLogo32' }} text="" onClick={this.abreformProjetos} />
											</li>

											<li className="liFields">
												<div className="img-painel">
													<Icon iconName="FieldNotChanged" className="ms-IconExample" />
												</div>
												<div className="texto-painel">
													Campos por Time
									</div>
												<PrimaryButton iconProps={{ iconName: 'FieldNotChanged' }} text="" onClick={this._abrePanelCamposPorTime} />
											</li>
										</ul>
										:
										""
									}
								</div>
								<div className="demandas-invision">
									<div className="conteudo">
										<div className="lista-demandas">
											<div className="demandas">
												<div className="conteudoHeader ">
													<div className="context-btn coll" >
													</div>
													<div className="colls headers">
														<div className="titulo coll">
															Título
											</div>
														<div className="descricao coll">
															Descrição
											</div>

														<div className="status coll">
															Time
											</div>
														<div className="status coll">
															Datas
											</div>
														<div className="status coll">
															Responsável TI
											</div>
													</div>
													{this.state.exibeCard ?
														<Card
															currentUserId={this.state.currentUserId}
															isGestor={this.state.isGestor}
															pageUrl={this.props.pageUrl}
															siteUrl={this.props.urlSite}
															filtroAtivo={this.state.filtroAtivo}
															filtroValue={this.state.filtroValue}
															spHttpClient={this.props.spHttpClient}
															siteUrlPicker={this.props.siteUrlPicker}
														/>
														: ""
													}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							:
							<div className="erro-message">{this.state.erroPermissao}</div>
						}
					</div>
				}
			</div>
		)
	}
}
export default containner;