import * as React from 'react';
import {
    getMyTeams,
    getFupItems,
    getItemByfilter
} from '../../services';
const fupTemplate = "Subject: [FUP] - Time \nX-Unsent: 1\nContent-Type: text/html; charset=\"UTF-8\"\n\n"+
                    "<!DOCTYPE HTML><html><head><style>td,th {vertical-align: top;text-align: left;border: 1px solid black;padding:6px}</style></head>"+
                    "<body><table style='border-collapse: collapse;' width=100%>"+
                    "<thead style='background-color: #ccc;'>"+
                        "<th>ID</th>"+
                        "<th>Item</th>"+
                        "<th>Descrição</th>"+
                        "<th>Responsável</th>"+
                        "<th>Status</th>"+
                        "<th>Previsão</th>"+
                        "<th>Observação</th>"+
                    "</thead>"+
                    "<tbody>{$BODY}</tbody></table></body></html>";
class Fup extends React.Component<any, any> {
    constructor(props: {}) {super(props);
        this.state = {

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
        getMyTeams(this.props.siteUrl).then(retorno =>{
            this._downloadFup(retorno);
        })
    }

    private _buildComents =(timesResponse)=>{
        let coutComment = 0;
        let comentario = []

        timesResponse.map((timeResponse) => {
            if(timeResponse.Comentario){
                if(coutComment == 0)
                    comentario.push("<div style='color:#4f81bd'><b >" + this._onParseDateFromString(timeResponse.data != null ?timeResponse.data : timeResponse.Created) + "</b> - " + timeResponse.Comentario.replace(/(?:\r\n|\r|\n)/g, '<br>')+ "</div><br/> ");
                else
                    comentario.push("<b>" + this._onParseDateFromString(timeResponse.data != null ?timeResponse.data : timeResponse.Created) + "</b> - " + timeResponse.Comentario.replace(/(?:\r\n|\r|\n)/g, '<br>')+ "<br/><br/> ");
            }
            coutComment++
        });
        return comentario
    }
        private _buildFup =(_fupItens):void=>{
        var fupOrder = [];
        let linhaFup = ""
        let contador = 0;
        _fupItens.map((keypair) => {
            getItemByfilter("?$filter=Title eq '" + keypair.Id + "'", this.props.siteUrl, "comentarios")
                .then(coments => {
                    contador++;
                    this.setState({
                        comentarioprojetoState: coments
                    });
                    let timesResponse = this.state.comentarioprojetoState;
                    timesResponse = timesResponse
                    let comentario = this._buildComents(coments);
                    fupOrder.push({
                       ID:keypair.Id,
                       Title:keypair.Title,
                       Descritivo:keypair.Descritivo,
                       ResponsavelArea:keypair.ResponsavelArea?  keypair.ResponsavelArea.Title : "",
                       StatusNameColor:this._statusColor( keypair.Status.Title),
                       Status: keypair.Status.Title,
                       DataFimEstimada:(keypair.DataFimEstimada != null ? this._onFormatDate(new Date(keypair.DataFimEstimada)) :""),
                       DataFimReal:(keypair.DataFimReal != null ? this._onFormatDate(new Date(keypair.DataFimReal)) :""),
                       Comentarios:comentario,
                       orderDate:(keypair.DataFimEstimada != null ? keypair.DataFimEstimada.replace(/-/g, '').split("T")[0] :""),
                    })                                    
                    if(contador == _fupItens.length){
                        fupOrder=fupOrder .sort(function(obj1, obj2) {
                            return obj2.orderDate - obj1.orderDate;
                        })
                        debugger
                        fupOrder.map((fuPInfo) => {
                            linhaFup += "<tr>";
                                linhaFup += "<td>" + fuPInfo.ID + "</td>";
                                linhaFup += "<td>" + fuPInfo.Title + "</td>";
                                linhaFup += "<td>" + fuPInfo.Descritivo +"</td>";
                                linhaFup += "<td>" + fuPInfo.ResponsavelArea +"</td>";
                                linhaFup += "<td>" + fuPInfo.StatusNameColor + "</td>";
                                if(fuPInfo.Status.trim().toLowerCase() == "entregue")
                                    linhaFup += "<td>" + fuPInfo.DataFimReal + "</td>";
                                else
                                    linhaFup += "<td>" + fuPInfo.DataFimEstimada + "</td>";
                                linhaFup += "<td>"
                                    fuPInfo.Comentarios.map((timeResponse) => {
                                        linhaFup+= timeResponse;
                                    });
                                linhaFup +="</td>";
                            linhaFup += "</tr>";
                        })
                        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                            var mail = fupTemplate.replace("{$BODY}", linhaFup);
                            var blob = new Blob([mail], { type: 'text/html;charset=utf8' });
                            var csvUrl = URL.createObjectURL(blob);
                            var element = document.createElement('a');
                            element.setAttribute('href', csvUrl);
                            element.setAttribute('download', "FUP.eml");
                            element.style.display = 'none';
                            document.body.appendChild(element);
                            element.click();
                            document.body.removeChild(element);
                        }else if (navigator.msSaveBlob) { // IE 10+ 
                            var mail = fupTemplate.replace("{$BODY}", linhaFup);
                            navigator.msSaveBlob(new Blob([mail], { type: 'text/html;charset=utf-8;' }), "FUP.eml"); 
                        }
                        else{
                            // var element = document.createElement('a');
                            // var mail = fupTemplate.replace("{$BODY}", linhaFup);
                            // element.setAttribute('href', 'data:text/html;charset=utf-8,' + (mail));
                            // element.setAttribute('download', "FUP.eml");
                            // element.style.display = 'none';
                            // document.body.appendChild(element);
                            // element.click();
                            // document.body.removeChild(element);
                            var mail = fupTemplate.replace("{$BODY}", linhaFup);
                            var blob = new Blob([mail], { type: 'text/html;charset=utf8' });
                            var csvUrl = URL.createObjectURL(blob);
                            var element = document.createElement('a');
                            element.setAttribute('href', csvUrl);
                            element.setAttribute('download', "FUP.eml");
                            element.style.display = 'none';
                            document.body.appendChild(element);
                            element.click();
                            document.body.removeChild(element);

                        }
                    }
                })
        });
    } 
    private _downloadFup =(times):void=>{
        
        var fupOrder = [];
        let filtro = ""

        let timesId = []
        times.map(time =>{
            timesId.push(time.Id)
        })
        let filterTeam = "(TimeId eq "+ timesId.join(" or TimeId eq ") +")"

        if(this.props.filtroValue.length > 0){
            filtro = "&$filter=("+ this.props.filtroValue+") and ("+filterTeam+")"
        }
        else{
            filtro = "&$filter=("+filterTeam+")"
            console.log("EXIBE MSG SEM FILTRO");
        }
    

        
        getFupItems(this.props.siteUrl,filtro).then(_fupItens => {
            this._buildFup(_fupItens);

        })
        .catch((error) => {
            console.log(error);
        })
    }
    private _statusColor = (statusName: string): string => {
        let color = "#333"
        if(statusName == "Backlog")
            color = "#3208ee"
        if(statusName == "Priorizado")
            color = "#7308ee"
        if(statusName == "Em andamento")
            color = "#ee6f08"
        if(statusName == "Homologação")
            color = "#ee0855"
        if(statusName == "Entregue")
            color = "#03af20"
        if(statusName == "Atrasado")
            color = "#ee0808"
        if(statusName == "Cancelado")
            color = "#ee082e"
        if(statusName == "On hold")
            color = "#08eeee"
        return "<div style='color:"+color+"'>"+statusName+"</div>";
    }
    private _onFormatDate = (date: Date): string => {
        return ('0' + date.getDate().toString()).slice(-2) + '/'
            + ('0' + (date.getMonth() + 1).toString()).slice(-2) + '/'
            + date.getFullYear();
    };
    render() {
        return (
            <div></div>
        );
    }
}
export default Fup;