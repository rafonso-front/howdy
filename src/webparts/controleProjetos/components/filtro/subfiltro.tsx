import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as React from 'react';
import { ActionButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

class Subfiltro extends React.Component <any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
            hideDialog:true,
            hideDialogDelete:true,
            nomeFiltro:""
        }
    }
    componentWillReceiveProps(nextProps) {

    }
    private _closeDialog = (): void => {

        this.setState({hideDialog:true})
    }
    private _openDialog = (): void => {

        this.setState({hideDialog:false})
    }
    private limpaFiltro = (): void => {
        this.props.limpaFiltro ? this.props.limpaFiltro() : null;
    }
    componentDidMount() {

    }
    clicado(field,id){
        this.props.removeFiltro ? this.props.removeFiltro(id.ID,field,false,id.Text) : null;
    }

    private salvaFiltroEditado = (): void => {
        this.props.salvaEditado ? this.props.salvaEditado() : null;
    }
    private salvaFiltro = (): void => {
            debugger
        if(this.state.nomeFiltro != "" && this.state.hideDialog == false){
            this._closeDialog()
            this.props.salvaFiltro ? this.props.salvaFiltro(this.state.nomeFiltro) : null;
        }
        else{
        }
    }
private _closeDialogDelete = (): void => {
    this.setState({hideDialogDelete:true})
}
private _openDialogDelete = (): void => {
    this.setState({hideDialogDelete:false})
}
private excluirFiltro = (): void => {
    this._closeDialogDelete()

    this.props.excluirFiltro ? this.props.excluirFiltro() : null;
}

    render () { 
        return (
            <div className="subitens">
                {this.props.relevanciaText.length > 0 ? 
                    <div>
                        <div className="titleSubItem">Relevância</div>
                        {this.props.relevanciaText.map((relevancia) =>
                            <div className="relevancia sub-menu">
                                <ActionButton
                                    data-automation-id="test"
                                    iconProps={{ iconName: 'RemoveFilter' }}
                                    allowDisabledFocus={true}
                                    onClick={() => this.clicado("Relevancia",relevancia)}
                                >
                                    {relevancia.Text}
                                </ActionButton>
                            </div>
                            )}
                    </div>
                :
                    ""
                }
                {this.props.statusText.length > 0 ? 
                    <div>
                        <div className="titleSubItem">Status</div>
                        {this.props.statusText.map((status) =>
                            <div className="status sub-menu">
                                 <ActionButton
                                    data-automation-id="test"
                                    iconProps={{ iconName: 'RemoveFilter' }}
                                    allowDisabledFocus={true}
                                    onClick={() => this.clicado("Status",status)}
                                >
                                    {status.Text}
                                </ActionButton>
                            </div>
                            )}

                    </div>
                :
                    ""
                }
                {this.props.tipoText.length > 0 ? 
                    <div>
                        <div className="titleSubItem">Tipo</div>
                        {this.props.tipoText.map((tipo) =>
                            <div className="tipo sub-menu">
                                <ActionButton
                                    data-automation-id="test"
                                    iconProps={{ iconName: 'RemoveFilter' }}
                                    allowDisabledFocus={true}
                                    onClick={() => this.clicado("Tipo",tipo)}
                                >
                                    {tipo.Text}
                                </ActionButton>
                            </div>
                        )}

                    </div>
                :
                    ""
                }
                {this.props.timeText.length > 0 ? 
                    <div>
                        <div className="titleSubItem">Time</div>
                        {this.props.timeText.map((time) =>
                            <div className="time sub-menu">
                                <ActionButton
                                    data-automation-id="test"
                                    iconProps={{ iconName: 'RemoveFilter' }}
                                    allowDisabledFocus={true}
                                    onClick={() => this.clicado("Time",time)}
                                >
                                    {time.Text}
                                </ActionButton>
                            </div>
                        )}

                    </div>
                :
                    ""
                }

                {this.props.pessoaText.length > 0 ? 
                    <div>
                        <div className="titleSubItem">Responsável TI</div>
                        {this.props.pessoaText.map((people) =>
                            <div className="people sub-menu">
                                <ActionButton
                                    data-automation-id="test"
                                    iconProps={{ iconName: 'RemoveFilter' }}
                                    allowDisabledFocus={true}
                                    onClick={() => this.clicado("ResponsavelTI",people)}
                                >
                                        {people[0].User!=undefined ? people[0].User.Title:people[0].text}
                                </ActionButton>
                            </div>
                        )}

                    </div>
                :
                    ""
                }
                {this.props.participanteText.length > 0 ? 
                    <div>
                        <div className="titleSubItem">Participante</div>
                        {this.props.participanteText.map((people) =>
                            <div className="people sub-menu">
                                <ActionButton
                                    data-automation-id="test"
                                    iconProps={{ iconName: 'RemoveFilter' }}
                                    allowDisabledFocus={true}
                                    onClick={() => this.clicado("Participante",people)}
                                >
                                    {
                                        people[0].User!=undefined ? people[0].User.Title:people[0].text
                                    }
                                </ActionButton>
                            </div>
                        )}

                    </div>
                :
                    ""
                }
                {this.props.titleOrIdText.length > 0 ? 
                    <div>
                        <div className="titleSubItem">Title/ID</div>
                            <div className="titleOrId sub-menu">
                                <ActionButton
                                    data-automation-id="test"
                                    iconProps={{ iconName: 'RemoveFilter' }}
                                    allowDisabledFocus={true}
                                    onClick={() => this.clicado("TitleText",this.props.titleOrIdText)}
                                >
                      
                                    {this.props.titleOrIdText}
                                </ActionButton>
                            </div>

                    </div>
                :
                    ""
                }

                {this.props.favoritosIds.length > 0 ? 
                    <div>
                        <div className="titleSubItem">&nbsp;</div>
                            <div className="titleOrId sub-menu">
                                <ActionButton
                                    data-automation-id="test"
                                    iconProps={{ iconName: 'RemoveFilter' }}
                                    allowDisabledFocus={true}
                                    onClick={() => this.clicado("favorito","")}
                                >
                      
                                    Favoritos
                                </ActionButton>
                            </div>

                    </div>
                :
                    ""
                }






                <div className="btn-action-filtro">
                    <ActionButton
                        data-automation-id="test"
                        iconProps={{ iconName: 'SaveAs' }}
                        allowDisabledFocus={true}
                        onClick={() => this._openDialog()}
                    >
                        Salvar Como
                    </ActionButton>
                    <ActionButton
                        disabled={this.props.IDFiltroEscolhido < 1? true:false}
                        data-automation-id="test"
                        iconProps={{ iconName: 'Save' }}
                        allowDisabledFocus={true}
                        onClick={() => this.salvaFiltroEditado()}
                    >
                        Salvar
                    </ActionButton>
                    <ActionButton
                        disabled={this.props.IDFiltroEscolhido < 1? true:false}
                        data-automation-id="test"
                        iconProps={{ iconName: 'Delete' }}
                        allowDisabledFocus={true}
                        onClick={() => this._openDialogDelete()}
                    >
                        Excluir
                    </ActionButton>

                    <ActionButton
                        data-automation-id="test"
                        iconProps={{ iconName: 'ClearFilter' }}
                        allowDisabledFocus={true}
                        onClick={() => this.limpaFiltro()}
                    >
                        Limpar
                    </ActionButton>
                </div>
                

                <Dialog
                    hidden={this.state.hideDialog}
                    onDismiss={this._closeDialog}
                >
                    <TextField
                        label="Nome Filtro"
                        required={true}
                        maxLength={255}
                        placeholder="Nome filtro..."
                        onChanged={(value) => this.setState({ nomeFiltro: value })}
                    />
                    <DialogFooter>
                        <PrimaryButton onClick={this.salvaFiltro} text="Salvar" />
                        <DefaultButton onClick={this._closeDialog} text="Cancelar" />
                    </DialogFooter>
                </Dialog>

                <Dialog
                    hidden={this.state.hideDialogDelete}
                    onDismiss={this._closeDialogDelete}
                >
                    Confirma a exclusão deste filtro?
                    <DialogFooter>
                        <PrimaryButton onClick={this.excluirFiltro} text="Confirmar" />
                        <DefaultButton onClick={this._closeDialogDelete} text="Cancelar" />
                    </DialogFooter>
                </Dialog>
            </div>
        )
    }
}
export default Subfiltro;