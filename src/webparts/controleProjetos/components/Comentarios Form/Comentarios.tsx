import * as React from 'react';
import {getItemByfilter} from '../../services';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import ComentariosEdit from '../comentarioEdicao/edicaoComentario'


class Comentarios extends React.Component<any, any> {
    constructor(props: {}) {super(props);
        this.state = {
            editable:false
        }
    }

    
    componentDidMount() {
        
        getItemByfilter("?$filter=Title eq '"+this.props.idProjeto+"'",this.props.siteUrl,"comentarios")
            .then(coments => {
                this.setState({comentarioprojetoState: coments});
                let comentarios = this.state. comentarioprojetoState;
                comentarios = comentarios
                let comentarioArr = [];
                
                if (comentarios != null && comentarios.length > 0) {
                    comentarios.map((comentario) => {
                        if(comentario.Comentario){
                            comentarioArr.push({
                                Comentario: comentario.Comentario,
                                Criacao: comentario.data != null ?comentario.data : comentario.Created,
                                ID:comentario.ID
                            })
                        }
                    });
                    this.setState({ComentariosDoProjeto: comentarioArr});
                }
            })
            .catch(error =>  {
            })
    }

    render() {
        return (
            <div><ul>
                {this.state.ComentariosDoProjeto ? 
                    this.state.ComentariosDoProjeto
                        .map((projeto) => 
                            <ComentariosEdit
                                projeto={projeto}
                                siteUrl={this.props.siteUrl}
                            /> 
                        )
                    : "Não existem comentários para esta demanda."
                }
            </ul></div>
        )
    }
}
export default Comentarios;