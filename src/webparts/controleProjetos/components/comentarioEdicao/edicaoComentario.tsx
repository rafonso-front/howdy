import * as React from 'react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import {
    getItemByfilter,
    atualizaComentarios
} from '../../services';
import {
    IconButton,
    IButtonProps
} from 'office-ui-fabric-react/lib/Button';
const floatL = {
    float: 'left',
  };
  const floatR = {
    float: 'right',
  };
  const clearDiv = {
    overflow: 'auto',
  };
  const list= {
    liststyle:'none'
  }
class ComentariosEdit extends React.Component < any, any > {
    constructor(props: {}) {
        super(props);
        this.state = {
            editable: false,
            comentarios: this.props.projeto,
            comentariosText:this.props.projeto.Comentario,
            oldText:this.props.projeto.Comentario
        }
    }
    _onParseDateFromString = (data): any => {
    
        if(data.indexOf("T") > -1){
            const values = (data || '').trim().split('T')[0].split('-');
            const day = values[2];
            const month = values[1];
            let year = values[0];
            return day + "/" + month;
        }
        else{
            const values = (data || '').trim().split(' ')[0].split('/');
            const day = values[0];
            const month = values[1];
            let year = values[0];
            return day + "/" + month;
        }
    };
    componentDidMount() {
    }
    abreEdicao = () => {
        this.setState({
            editable: true,
            comentariosText: this.state.comentariosText
        })
    }
    _cancela = ()=>{
        this.setState({editable: false})
        this.setState({
            comentariosText:this.state.oldText
        })
    }
    _salvaComentarios = () =>{
        let dadosForm = {
            Comentario: this.state.comentariosText
        }
        atualizaComentarios(this.props.siteUrl,dadosForm,this.state.comentarios.ID)
        .then(dataComments => {
            this.setState({editable: false,oldText:this.state.comentariosText})
        })
    }
    render() {
        return ( 
            <li className="li-comentario"> {
                this.state.editable ?
                    <div className = "linha-comentario" >
                        <div className = "comentario" >
                            <b > {this._onParseDateFromString(this.props.projeto.Criacao)} </b>  
                            -
                            <TextField
                                label="Comentário"
                                placeholder="Descreva aqui seu comentário..."
                                multiline={true}
                                maxLength={10000}
                                rows={4}
                                onChanged={(value) => this.setState({ comentariosText: value })}
                                value={this.state.comentariosText}
                            />
                            <div className = "icons" >
                            <IconButton
                                    iconProps = {{iconName: 'Save'}}
                                    title = "Save" 
                                    ariaLabel = "Save"
                                    onClick = {this._salvaComentarios}
                                />
                                <IconButton
                                    iconProps = {{iconName: 'Cancel'}}
                                    title = "Cancel" 
                                    ariaLabel = "Cancel"
                                    onClick = {this._cancela}
                                />
                                
                            </div> 
                        </div> 
                    </div>                      :
                    <div className = "linha-comentario" >
                        <div className = "comentario">
                            {this.state.comentariosText != null ?
                                <div><b > {this._onParseDateFromString(this.state.comentarios.Criacao)}</b>&nbsp;-&nbsp;<span dangerouslySetInnerHTML = {{__html: this.state.comentariosText.replace(/(?:\r\n|\r|\n)/g, '<br/>')}}></span></div> 
                                :
                                <div><b > {this._onParseDateFromString(this.state.comentarios.Criacao)}</b>&nbsp;-&nbsp;<span dangerouslySetInnerHTML = {{__html: this.state.comentariosText}}></span></div> 
                            }
                            <div className = "icons" >
                                <IconButton
                                    iconProps = {{iconName: 'EditMirrored'}}
                                    title = "Editar" 
                                    ariaLabel = "Editar"
                                    onClick = {this.abreEdicao}
                                />
                            </div> 
                        </div> 
                    </div>                                
                }
            </li>
        )
    }
}
export default ComentariosEdit;