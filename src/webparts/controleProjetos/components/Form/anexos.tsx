import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

import * as React from 'react';
import {
    delArquivos,
    getArquivos
} from '../../services';

let arquivo = [];
let arq: any;
class Anexos extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
            demandaid:this.props.demandaid,
        }
    }

    componentDidMount() {
        if(this.state.demandaid > 0){
            getArquivos(this.props.siteUrl, this.state.demandaid).then(data => {
                arq = data;
                this.setState({ arq: arq })
            });
        }
    }
    readUploadedFileAsText = inputFile => {
        debugger
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = () => {
               let x =  resolve(reader.result);
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
        arquivo.push({nome: fname, byteBuffer: arq})
        this.setState({arquivo: arquivo})
    }

    _delLocalArquivos = (k) => {
        delete arquivo[k];
        this.setState({arquivo: arquivo})
    }

    _delArquivos = (url, id, filename, key) => {
        delete arq[key];
        this.setState({arq:null})
        delArquivos(url, id, filename).then(data => {
            this.setState({ arq: arq })
        });
    }
    render() {
        return (
            <div>
                <div className="clear-left">
                    <div className="ms-Grid-col ms-sm6 ms-lg6">
                        {this.state.waitingForFileUpload && <span>Uploading file...</span>}

                        {
                            this.state.arq ? 
                                this.state.arq.map((item, key ) => 
                                <div style={{ display: "flex" , marginBottom:"10px" }}>
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
                        :""}

                        {
                            this.state.arquivo ? 
                                this.state.arquivo.map((item, key) => 
                                <div style={{ display: "flex" , marginBottom:"10px" }}>
                                    <DefaultButton 
                                        text={item.nome} 
                                        disabled={true} />
                                    <DefaultButton
                                        iconProps={{ iconName: 'Cancel' }}
                                        onClick={() => this._delLocalArquivos(key)}
                                    />
                                </div>  
                                ) 
                        :""}
                        <div style={{ display: "flex" }}>
                            <PrimaryButton iconProps={{ iconName: 'FabricNewFolder' }}>
                                <label onClick={() => {document.getElementById("myFileUpload").click()}}>Escolher Arquivossssssssssss</label>
                                <input id="myFileUpload" type="file"  onChange={this.uploadFile} style={{ display: "block"}} />
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        )}
}
export default Anexos;